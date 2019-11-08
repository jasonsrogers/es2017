// Async.functions
console.log('Async.functions')

/*
    async/await is the biggest change of ES2017

    it uses a combination of promises and gerators to simplify the logic around promises and the chainning limitations

    promisses where introduce in ES6 to simplify the issues that async involved and the nightmare of callback hell

    read more about it here: https://blog.hellojs.org/asynchronous-javascript-from-callback-hell-to-async-and-await-9b9ceb63c8e8    
 */

// Note in this file, I'm going to call the next example funcitons when the previous finishes, this is to make sure the outputs are in the right order without creating
// promise chains (which would get messy to read) or using async (as I want to keep the example as small as possible and overusing async could cause confusion)

const getPromise = (message = 'I did something') => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(message), 1000)
    })
} 

const example1 = () => {

    console.log('Example 1')

    console.log('Before')
    getPromise().then(res => {
        console.log(res)
        example2()
    })
    console.log('After')
// expected
// Before
// After
// I did something

// the order is wrong
}


const example2 = () => {
    console.log('Example 2')

    console.log('Before')
    getPromise().then(res => {
        console.log(res)
    }).then(()=>{
        console.log('After') // <= yes the log could be done inside the previous then, but it wouldn't really illustrate the structure of multiple async
    }).then(()=>{
        example3()
    })
// expected
// Before
// I did something
// After

// the order is correct but we had to chain the
}

const example3 = ()=>{
    
    (async () => {
        console.log('Example 3')
        console.log('Before')
        let res = await getPromise()
        console.log(res)
        console.log('After')
        example4()
    })(); // Note: you can't use await outside of a async function, so for the purpose of the example the this call is wrapped inside a self executing async function
        // this is a cheat that you shouldn't do this is just for clarity, check example for a better usage

// expected
// Before
// I did something
// After

// TADA now we have our logs in the right order without needing a promise chain :)
// Check example 4 for a more realistic example
}

const example4 = () => {

    async function asyncWatchingTo(){
        let res = await getPromise('asyncWatchingTo Promise')
        return `I wanted a sneak peak to ${res}`
    }

    async function asyncWaitForStuff() {
        let res = await getPromise('Promise1')
        console.log(res)
        res = await getPromise('Promise2')
        console.log(res)
        res = await asyncWatchingTo()
        console.log(res)
        return `I'm happy that I live outside a chain`
    }
    // this allows you to cut back on the number of promise.then you need inside your code
    // since we are in a normal function we can't await the return of asyncWaitForStuff
    asyncWaitForStuff().then((res)=>{
        console.log(`And at the end ${res}`)
    })

}


example1()