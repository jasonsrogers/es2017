//Trailing commas
console.log("Trailing commas");

/*
since the beginning the final comma is ignored, this is mainly to make it simpler to format code
var arr = [
  1, 
  2, 
  3, 
];
if you want to add a new line, you don't need to modify the previous line
*/

// Arrays
var arr = [1, 2, 3];

console.log(`arr.length: ${arr.length}`);
// 3
arr.forEach(item => console.log(`-> ${item}`));
// -> 1
// -> 2
// -> 3

// but it allows to create longer arrays if multiple , by creating elision
var arr2 = [1, 2,,, 3,,,];

console.log(`arr2.length: ${arr2.length}`);
// 7

arr.forEach(item => console.log(`-> ${item}`));
// -> 1
// -> 2
// -> 3

// Since ES5 trailing commas are allowed in objects
var object = { 
    foo: "bar", 
    baz: "qwerty",
    age: 42,
  };

// ES2017 allows trailing comas in functions

// Parameter definitions: the comma does affect length of arguments, these are all equal
function fn(param) {}
function fn(param,) {} 

(param) => {};
(p,) => {};

// same with methods
class C {
    one(a,) {}
    two(a, b,) {}
  }
  
  var obj = {
    one(a,) {},
    two(a, b,) {},
  };

f = ()=>{}
// Function calls
f(p);
f(p,);

Math.max(10, 20);
Math.max(10, 20,);

/*
Illegal definition
function f(,) {} // SyntaxError: missing formal parameter
(,) => {};       // SyntaxError: expected expression, got ','
f(,)             // SyntaxError: expected expression, got ','

function f(...p,) {} // SyntaxError: parameter after rest parameter
(...p,) => {}        // SyntaxError: expected closing parenthesis, got ','
*/

// works in destructuring too as it's ignored 
// array destructuring with trailing comma
[a, b,] = [1, 2];

// object destructuring with trailing comma
var o = {
  p: 42, 
  q: true,
};
var {p, q,} = o;

/*
 but not when using the rest operator as you're collecting the rest
var [a, ...b,] = [1, 2, 3];
SyntaxError: rest element may not have a trailing comma
 */

 // but you can do this 
 var [a,, ...b] = [1, 2, 3, 4, 5,];
 // a => 1
 // b => [3,4,5]

 // JSON... doesn't allow it ^^, JSON is pre ES5 so can't handle trailing comma in objects
 /*
JSON.parse('[1, 2, 3, 4, ]');
JSON.parse('{"foo" : 1, }');
SyntaxError JSON.parse: unexpected character 
at line 1 column 14 of the JSON data
Omit the trailing commas to parse the JSON correctly:

JSON.parse('[1, 2, 3, 4 ]');
JSON.parse('{"foo" : 1 }');
 */