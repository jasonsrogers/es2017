// Shared Memory and Atomics
console.log("Shared Memory and Atomics");

console.warn(
  "This was used speculative side-channel attacks so it has been disabled by most browsers for several versions, check compatibility table"
);
// https://www.chromium.org/Home/chromium-security/ssca

// SharedArrayBuffer
/*
To share memory using SharedArrayBuffer objects from one agent in the cluster to another (an agent is either the web page’s main program
or one of its web workers), postMessage and structured cloning is used.

The structured clone algorithm accepts SharedArrayBuffers and TypedArrays mapped onto SharedArrayBuffers. In both cases, the SharedArrayBuffer
 object is transmitted to the receiver resulting in a new, private SharedArrayBuffer object in the receiving agent (just as for ArrayBuffer).
 However, the shared data block referenced by the two SharedArrayBuffer objects is the same data block, and a side effect to the block in one 
 agent will eventually become visible in the other agent.

var sab = new SharedArrayBuffer(1024);
worker.postMessage(sab);
*/

// In a nutshell, when you start getting involved in web workers to offload heavy pieces of work SharedArrayBuffer is you friend
// https://www.sitepen.com/blog/the-return-of-sharedarraybuffers-and-atomics/
// NOTE: To a lot of web dev that have not had to deal with native programming (C/C++) or things like webGL, this will feel weird
// In my opinion this level of optimization is good only if justified (high performance libs etc), but not for day to day stuff
// Because it's arrayBuffers, it is not clear/easy to understand what your passing back and forth at a glance as all your data is
// deconstructed to fit into an array


console.log('Look at Shared.Memory.and.Atomics.worked to see an basic example of manipulating a common SharedArrayBuffer between the Main thread and a worked')


console.log('===> Atomics.load')
// create a SharedArrayBuffer with a size in bytes
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 5;

// 5 + 2 = 7
console.log(Atomics.add(uint8, 0, 2));
// expected output: 5

console.log(Atomics.load(uint8, 0));
// expected output: 7

console.log('===> Atomics.store')
// create a SharedArrayBuffer with a size in bytes
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 5;   // <=== this is the "wrong" way of doing it as it doesn't guarantee that the operation is finished before another one jumps
                // but it is ok while it's not shared

console.log(Atomics.store(uint8, 0, 2));
// expected output: 2

console.log(Atomics.load(uint8, 0));
// expected output: 2


console.log('===> Atomics.add')
// Atomics.add
// create a SharedArrayBuffer with a size in bytes
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 7;

// 7 + 2 = 9
console.log("uint8", uint8);
// uint8 Uint8Array [ 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
console.log(Atomics.add(uint8, 0, 2));
// expected output: 7 <=== note: returns the old value
// 9 <=== current value
console.log(Atomics.load(uint8, 0));
// expected output: 9 <==== using load guarantees that any ongoing operation has finished

console.log('----')

var sab = new SharedArrayBuffer(1024);
var ta = new Uint8Array(sab);

console.log(Atomics.add(ta, 0, 12)); // returns 0, the old value
console.log(Atomics.load(ta, 0)); // 12


console.log('===> Atomics.sub')
// Atomics.sub <=== this is the equivalent of Atomics.add of a neg value ... but it avoid you flipping a variable
// create a SharedArrayBuffer with a size in bytes
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 7;

// 7 - 2 = 5
console.log(Atomics.sub(uint8, 0, 2));
// expected output: 7 <=== note: returns the old value
// 5 <=== current value
console.log(Atomics.load(uint8, 0));

// 5 + -2 = 3
console.log(Atomics.add(uint8, 0, -2));
// 3 
console.log(Atomics.load(uint8, 0));
console.log('----')
// 3 - (nothing) = 3
console.log(Atomics.sub(uint8, 0));
console.log(Atomics.load(uint8, 0));
console.log(Atomics.sub(uint8, 0, null));
console.log(Atomics.load(uint8, 0));


console.log(Atomics.sub(uint8, 0, '2'));
// 1 <=== '2' got treated as a number
console.log(Atomics.load(uint8, 0));

console.log(Atomics.sub(uint8, 0, 'a'));
// 1 <=== 'a' got ignored
console.log(Atomics.load(uint8, 0));

console.log(Atomics.sub(uint8, 0, 2));
// 255 <=== We looped round
console.log(Atomics.load(uint8, 0));



console.log('===> Atomics.and')

// create a SharedArrayBuffer with a size in bytes
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 7;

console.log(Atomics.and(uint8, 0, 2)); 
// expected output: 7 <=== again, returns previous value
console.log(Atomics.load(uint8, 0)); 
// 7: 0111 AND 2: 0010 => 0010 => 2
console.log('----')
uint8[0] = 7;
console.log(Atomics.and(uint8, 0, 11)); 
// expected output: 7 <=== again, returns previous value
console.log(Atomics.load(uint8, 0)); 
// 7: 0111 AND 10: 1011 => 0011 => 3

console.log('===> Atomics.or')
// create a SharedArrayBuffer with a size in bytes
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 6;

console.log(Atomics.or(uint8, 0, 5)); 
// expected output: 6 <=== again, returns previous value
console.log(Atomics.load(uint8, 0)); 
// 6: 0110 OR 5: 0101 => 0111 => 7
console.log('===> Atomics.xor')
// create a SharedArrayBuffer with a size in bytes
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 7;

// 7 (0111) XOR 2 (0010) = 5 (0101)
console.log(Atomics.xor(uint8, 0, 2));
// expected output: 7

console.log(Atomics.load(uint8, 0));
// expected output: 5

console.log('===> Atomics.exchange')
// exchanges value at index if the current value is the one we expect
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 5;

Atomics.exchange(uint8, 0,2); // returns 5
console.log(Atomics.load(uint8, 0));
// expected output: 2 

Atomics.exchange(uint8, 0, 4); // returns 2
console.log(Atomics.load(uint8, 0));
// expected output: 4

console.log('===> Atomics.compareExchange')
// exchanges value at index if the current value is the one we expect
var buffer = new SharedArrayBuffer(16);
var uint8 = new Uint8Array(buffer);
uint8[0] = 5;

Atomics.compareExchange(uint8, 0, 5, 2); // returns 5
console.log(Atomics.load(uint8, 0));
// expected output: 2 <=== we found 5 at index 0 so we replace it with 2

Atomics.compareExchange(uint8, 0, 5, 4); // returns 2
console.log(Atomics.load(uint8, 0));
// expected output: 2 <=== we didn't find 5 at index 0 so it wasn't replaced, but the "old" value at the index is still returned, so useful to debug ^^




