// getOwnPropertyDescriptors
console.log("getOwnPropertyDescriptors");

function logOwnPropertyDescriptor(obj, attr) {
  const desc = Object.getOwnPropertyDescriptors(obj);
  const { value, writable, get, set, configurable, enumerable } = desc[attr];
  console.log(`
      value ${value},
      writable ${writable},
      get ${get}
      set ${set}
      configurable ${configurable}
      enumerable ${enumerable}`);
}

const object1 = {
  property1: 42
};

logOwnPropertyDescriptor(object1, "property1");

console.log("---");
// value 42,
// writable true,
// get undefined
// set undefined
// configurable true
// enumerable true

const object2 = {
  property2: 43,
  property3: 44,
  get property3() {
    return this.property3;
  },
  set property3(val) {
    this.property3 = val;
  }
};

logOwnPropertyDescriptor(object2, "property2");
console.log("---");
logOwnPropertyDescriptor(object2, "property3");
console.log("---");
console.log(Object.getOwnPropertyDescriptors(object2));

// Where this becomes interesting it when cloning
var obj = {
  foo: 1,
  get bar() {
    return 2;
  }
};
// assign will call the getters rather than copy
console.log(Object.assign({}, obj));
// { foo: 1, bar: 2 }, the value of copy.bar is obj.bar's getter's return value.

console.log(
  Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  )
);
//{ foo: 1, bar: [Getter] }

// creating a subclass
function superclass() {
  this.a = 1;
  this.b = 2;
}
superclass.prototype = {
  // Define your methods and properties here
  get bar() {
    return 2;
  },
  testFn() {}
};
function subclass() {
  this.a = 3;
  this.c = 4;
}
subclass.prototype = Object.create(
  superclass.prototype,
  // Note here we 
  Object.getOwnPropertyDescriptors({
    // Define your methods and properties here
    get foo() {
      return 5;
    },
    testFn2() {}
  })
);

const sup = new superclass();
console.log(sup);
const sub = new subclass();
console.log(sub);

/*
ES6 gave us Object.assign(), which copies all enumerable own properties from one or more objects, and return a new object.

However there is a problem with that, because it does not correctly copies properties with non-default attributes.
*/
// For example with

const person1 = {
    set name(newName) {
        console.log(newName)
    }
}
// This won’t work:

const person2 = {}
Object.assign(person2, person1)

// But this will work:

const person3 = {}
Object.defineProperties(person3,
  Object.getOwnPropertyDescriptors(person1))


person1.name = 'x'
// "x"

person2.name = 'x'
//  <=== not output

person3.name = 'x'
// "x"