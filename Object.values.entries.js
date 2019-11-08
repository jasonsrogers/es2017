//Object.entries()
console.log("Object.entries()");

let obj = {
  a: 1,
  b: 2,
  something: "dark",
  arr: [1, 2, 3, 4],
  empty: "",
  undef: undefined,
  bool: false
};
let arrayLikeObj = { 100: "a", 4: "b", 22: "c" };
let objToCoerce = "coerce";
let nestedObj = {
  a: 1,
  b: 2,
  c: { d: 4, e: 5 }
};

// getFoo is property which isn't enumerable
var objectWithFunction = Object.create(
  {},
  {
    getFoo: {
      value: function() {
        return this.foo;
      }
    }
  }
);
objectWithFunction.foo = "bar";
objectWithFunction.c = function() {
  return 3;
};

console.log("Object.entries(obj):");
// coerces an object into an array of arrays containing key/value pairs.

console.log(Object.entries(obj));
/**
 [ [ 'a', 1 ],
  [ 'b', 2 ],
  [ 'something', 'dark' ],
  [ 'arr', [ 1, 2, 3, 4 ] ],
  [ 'empty', '' ],
  [ 'undef', undefined ],
  [ 'bool', false ] ]



  // NOTE: in ES2019, the 'reverse' Object.fromEntries is introduced
 */
console.log(obj);
// { a: 1, b: 2, something: 'dark', arr: [ 1, 2, 3, 4 ] }

// enumerable properties same order as a for .. in (without property chain)
console.log(Object.entries(arrayLikeObj));
//[ [ '4', 'b' ], [ '22', 'c' ], [ '100', 'a' ] ]
console.log(Object.entries(nestedObj));
// [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', { d: 4, e: 5 } ] ]
console.log(Object.entries(objectWithFunction));
// [ [ 'foo', 'bar' ], [ 'c', [Function] ] ]
console.log(Object.entries(objToCoerce));
/*
[ [ '0', 'c' ],
  [ '1', 'o' ],
  [ '2', 'e' ],
  [ '3', 'r' ],
  [ '4', 'c' ],
  [ '5', 'e' ] ]
*/

console.log("Object.values()");
console.log("Object.values(obj):");
console.log(Object.values(obj));
//[ 1, 2, 'dark', [ 1, 2, 3, 4 ], '', undefined, false ]

// enumerable properties same order as a for .. in (without property chain)
console.log(Object.values(arrayLikeObj));
// [ 'b', 'c', 'a' ]

console.log(Object.values(nestedObj));
// [ 1 , 2 , { d: 4, e: 5 } ]

console.log(Object.values(objectWithFunction));
// [ 'bar', [Function] ]

console.log(Object.values(objToCoerce));
//[ 'c', 'o', 'e', 'r', 'c', 'e' ]
