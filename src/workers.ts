const { Worker, isMainThread, workerData } = require('worker_threads');

// let data = 'My data';
// if (isMainThread) {
//   const worker = new Worker(__filename, { workerData: data });
// } else {
//   console.log(workerData);  // Prints 'Hello, world!'.
// }


import {lookFilesFirstIt} from './look-files';

export function workersStart() {
  if (isMainThread) {
    // This re-loads the current file inside a Worker instance.
    console.log('Main thread');
    const path_files: string = "../TeContests/DataClusteringSample0107";
    let folders = lookFilesFirstIt(path_files);
    for (const folder of folders) {
      console.log(folder);
      new Worker(__filename, {wokerData: folder});
    }
    // new Worker(__filename, {WokerData: folder});
  } else {
    console.log("Inside Worker!");
    console.log(isMainThread); // Prints 'false'.
    console.log(workerData); 
  }
}     



// import cluster = require('cluster');
// import * as http from 'http';
// import * as os from 'os';
// import {lookFilesFirstIt} from './look-files';
// const numCPUs = os.cpus().length;

// let folders : string[];
// let cluster_count = 0;
// export function classtersStart() {
//   if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);

// const path_files: string = "../TeContests/DataClusteringSample0107";
//     folders = lookFilesFirstIt(path_files);
//     for (const iter of folders) {
//       console.log(iter);
//       cluster.fork();
//     }

//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//       // cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//       console.log(`worker ${worker.process.pid} died`);
//     });
//   } else {

//     cluster_count++;
//     console.log(`Worker ${process.pid} started`);
//     console.log(`Cluster count ${cluster_count}`);
//   }
// }
