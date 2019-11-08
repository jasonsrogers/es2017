// $ node --experimental-worker Shared.Memory.and.Atomics.worker.js 
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  const shared = new Uint8Array(new SharedArrayBuffer(1));
  shared.set([1]);
  worker.on("message", message => {
    console.log(message, Atomics.load(shared, 0));
  });
  worker.postMessage(shared);
} else {
  parentPort.once("message", shared => {
    parentPort.postMessage("Check now: before");
    setTimeout(() => {
      Atomics.add(shared, 0, 2);
      parentPort.postMessage("Check now: after");
      
    }, 1000);
    setTimeout(() => {
      Atomics.add(shared, 0, 2);
      parentPort.postMessage("Check now: after");
      
    }, 2000);
  });
}
