// Async.functions.edgecases
console.log("Async.edgecases");
// NOTE: examples are grouped in function to make the examples run one after another (joy of async)
// this is just regroups of things about await async

function alert(text) {
  console.log("Alert: ", text);
}

// Async can return value of promise
async function f1() {
  return 1;
}

function example1() {
  console.log("Example 1");
  // Async always returns a promise
  f1().then(alert);

  // We can explicitly return a promise for the same result
  async function f2() {
    return Promise.resolve(2);
  }
  f2().then(alert);
  example2();
}
example1();

// NOTE you are calling async functions just like a normal function without a specific context

// AWAIT:
// Only works in regular function

function f3() {
  let promise = Promise.resolve(1);
  // let result = await promise; // Syntax error
  // This won't even run on nodejs as it's a syntax error just like malformed js:
  //  window.print(;
}
// basic funciton to simulate an ansync function call (like get or an animation)
async function delayedConsoleLog(text = "done!", delay = 1000) {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(text), delay);
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"

  return result;
}

// for the same reason you can't just "run" await at the top level because you're not at the top level
/*
    await f4() // SyntaxError: await is only valid in async function
*/
function example2() {
  console.log("Example 2");
  (async () => {
    let result = await delayedConsoleLog();
    console.log(
      `delayedConsoleLog inside async self executing function: ${result}`
    );
    example3();
  })();
}
// but you can "cheat" and run the code insde a self executing function

// this is a bit wierd of a syntaxt and voids a bit the use of async/await as it will not wait for anonymous function
function example3() {
  console.log("Example 3");
  console.log("before");

  (async () => {
    await delayedConsoleLog("first");
    await delayedConsoleLog("second");
    await delayedConsoleLog("third");

    async function wait() {
      return await Promise.resolve(1);
    }
    let res = await wait();

    example4();
  })();

  console.log("after");
  /* expected outcome: 
    before
    after
    first
    second
    third
    */
}

function example4() {
  console.log("Example 4");
  // accepts promises then but also objects that follow the thenable pattern
  // thanks js info for the example: https://javascript.info/async-await
  class Thenable {
    constructor(num) {
      this.num = num;
    }
    then(resolve, reject) {
      alert("Then of custom class");
      // resolve with this.num*2 after 1000ms
      console.log("this.num * 2", this.num * 2);
      setTimeout(() => resolve(this.num * 2), 1000); // (*)
    }
    // you can also declare async methods directly
    async wait() {
      console.log("wait");
      return await Promise.resolve(1);
    }
  }

  async function f() {
    // waits for 1 second, then result becomes 4
    let result = await new Thenable(2);
    alert(`Result of Thenable then class: ${result}`);
    result = await new Thenable().wait();
    alert(`Result of Thenable wait class: ${result}`);
    example5();
  }

  f();
}

function example5() {
  console.log("Example 5");
  // error handling in with async/await
  async function f() {
    try {
      let response = await fetch("/no-user-here");
      let user = await response.json();
    } catch (err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
    example6();
  }

  f();
}

function example6() {
  console.log("Example 6");
  async function f() {
    let response = await fetch("http://no-such-url");
    //...
  }
  // if there is no try catch block, the error will trigger the promise catch
  f()
    .catch(alert) // remember, async is a promise, so after a catch the chain is restored
    .then(() => {
      example7();
    });

  /*
    this could also be written inside an async as:
    await f().catch(alert)
    example7();
    
    If you forget the then or await, it would move onto example7 BEFORE the exception is handeled
    which can be confusing when debugging
    */

  // NOTE: we try/catch block is usually favoured as you can wrap a series of awaits for clarity
  // with await, the use of 'then' is also reduced (the whole point of using async/await)
  // BUT when at a top level that is not an async function, .catch() and .then() shine again ^^
}

function example7() {
  console.log("Example 7");
  // Promise.all is also a promise sooooo you can use await too
  async function f() {
    console.log("before");
    await Promise.all([
      delayedConsoleLog("first", 1000),
      delayedConsoleLog("second", 500),
      delayedConsoleLog("third", 1000)
    ]);
    console.log("after");
    example8();
    /* expected result:
    before 
    second
    first
    third
    after

    NOTE: Promise.all is parallel execution, it doesn't guarantee an order
    */
  }
  f();
}
function successfulPromise(text) {
  return new Promise(function(resolve, reject) {
    resolve(`Success ${text}`);
  });
}
function rejectedPromise(text) {
  return new Promise(function(resolve, reject) {
    reject(`Reject ${text}`);
  });
}
// example 8,9,10 show different error handling scenarios
function example8() {
  console.log("Example 8");
  async function f() {
    try {
      let res = await successfulPromise(1);
      alert(res);
      res = await successfulPromise(2);
      alert(res);
      res = await successfulPromise(3);
      alert(res);
      res = await rejectedPromise(4);
      /*
              here our promise fails and 5 never gets called
          */
      alert(res);
      res = await successfulPromise(5);
      alert(res);
    } catch (err) {
      // handle things like rewind/undo change, show message etc
      console.log(err);
    }
    console.log("life goes on");
    example9();
  }
  f();
}
// putting the catch on each call allows you to ensure all the calls you want to do, will happen
function example9() {
  console.log("Example 9");
  async function f() {
    let res = await successfulPromise(1).catch(alert);
    alert(res);
    res = await successfulPromise(2).catch(alert);
    alert(res);
    res = await successfulPromise(3).catch(alert);
    alert(res);
    res = await rejectedPromise(4).catch(alert);
    /*
        here our promise fails but we handle and continue the change
      */
    alert(res); // prints out undefined because alert doesn't return anything
    res = await successfulPromise(5).catch(alert);
    alert(res);

    console.log("life goes on");
    example10();
  }
  f();
}
// we can handle complex scenarios like if a call succeeds to A otherwise B and always C if a much more elegant way
function example10() {
  console.log("Example 10");
  async function f() {
    let res = await successfulPromise(1);
    alert(res);
    if (res) {
      res = await rejectedPromise(2).catch(reason => {
        console.log("Reason reject: ", reason);
        let shouldIContinue = false;
        // handle and decide if to continue the chain
        return shouldIContinue;
      });
    }
    /*
        based on the result of the previous call decide what to do  
      */
    alert(res);
    if (res) {
      res = await successfulPromise(3);
      alert(res);
    } else {
      res = await successfulPromise(4);
      alert(res);
    }
    res = await successfulPromise(5);
    alert(res);
  }
  f();
}
