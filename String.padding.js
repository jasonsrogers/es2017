//String padding
console.log("String padding: padStart, padEnd");

// pad is to make the string reach a particular length
const s = "root";
console.log("\npadStart");
console.log(`padStart(4): '${s.padStart(4)}'`); // 'root'
console.log(`padStart(5): '${s.padStart(5)}'`); // ' root'
console.log(`padStart(8): '${s.padStart(8)}'`); // '    root'
console.log(`padStart(3): '${s.padStart(3)}'`); // 'root' => doesn't truncate string to match smaller number
// can specify default string to fill in from
console.log(`padStart(8): '${s.padStart(8, "abcdef")}'`); // 'abcdroot'
console.log(`padStart(20): '${s.padStart(20, "abcdef")}'`); // 'abcdefabcdefabcdroot' <=loops through the filler string

console.log("\npadEnd");
console.log(`padEnd(4): '${s.padEnd(4)}'`); // 'root'
console.log(`padEnd(5): '${s.padEnd(5)}'`); // 'root '
console.log(`padEnd(8): '${s.padEnd(8)}'`); // 'root    '
console.log(`padEnd(3): '${s.padEnd(3)}'`); // 'root' => doesn't truncate string to match smaller number
// can specify default string to fill in from
console.log(`padEnd(8): '${s.padEnd(8, "abcdef")}'`); // 'rootabcd'
console.log(`padEnd(20): '${s.padEnd(20, "abcdef")}'`); // 'rootabcdefabcdefabcd' <=loops through the filler string
