// import {workersStart} from './workers';

// workersStart()

// const { Worker, isMainThread, workerData } = require('worker_threads');
import {lookFilesFirstIt, 
        lookFilesInDirectory, 
        getFiles,
        parseLanguage,
        GetFilesInDirectory} from './look-files';

import { emptyLanguages } from './parse';

//   if (isMainThread) {
//     // This re-loads the current file inside a Worker instance.
//     // console.log('Main thread');
//     // const path_files: string = "../TeContests/DataClusteringSample0107";
//     // let folders = lookFilesFirstIt(path_files);
//     // for (const folder of folders) {
//     //   console.log(folder);
//     //   // new Worker(__filename, {wokerData: 'test'});
//     // }
//     new Worker(__filename, {wokerData: 'folder new'});
//   } else {
//     console.log("Inside Worker!");
//     console.log(isMainThread); // Prints 'false'.
//     console.log(workerData); 
//   }

// if (isMainThread) {
//   console.log('Main thread');
//   const path_files: string = "../TeContests/DataClusteringSample0107";
//   let folders = lookFilesFirstIt(path_files);
//   for (const folder of folders) {
//     // console.log(folder);
//     // new Worker(__filename, {wokerData: 'test'});
//   const worker = new Worker(__filename, { workerData: folder });
//   }
// } else {
//   console.log('New worker');
//   console.log(workerData);  // Prints 'Hello, world!'.
//   lookFilesInDirectory(workerData);

// }

const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  console.log('Create main thread');
  // module.exports = function parseJSAsync(script) {
  //   return new Promise((resolve, reject) => {
  //     const worker = new Worker(__filename, {
  //       workerData: script
  //     });
  //     worker.on('message', resolve);
  //     worker.on('error', reject);
  //     worker.on('exit', (code) => {
  //       if (code !== 0)
  //         reject(new Error(`Worker stopped with exit code ${code}`));
  //     });
  //   });
  // };

  console.log('Main thread');
  const path_files: string = "../TeContests/DataClusteringSample0107";
  let folders = lookFilesFirstIt(path_files);
  let files_count = 0;
  let files = [];
  let worker_count = 0;
  let allLanguages = emptyLanguages();
  let addData = (langData) => {
        allLanguages[0].articles = allLanguages[0].articles.concat(langData[0].articles);
        allLanguages[0].count += langData[0].count; 
        allLanguages[1].articles = allLanguages[1].articles.concat(langData[1].articles);
        allLanguages[1].count += langData[1].count; 
        allLanguages[2].articles = allLanguages[2].articles.concat(langData[2].articles);
        allLanguages[2].count += langData[2].count; 
  };
  for (const folder of folders) {
    const worker = new Worker(__filename, { workerData: folder });
    ++worker_count;

      worker.on('message', (mes)=> {
        // console.log('Message',mes.data[0].count + mes.data[1].count + mes.data[2].count, mes.count);
        // console.log(mes);
        files_count += mes.count;
        addData(mes.data);
      });
      // worker.on('error', reject);
      worker.on('exit', (code : number) => {
        console.log('count files ', files_count);
        if (code !== 0)
          console.log(new Error(`Worker stopped with exit code ${code}`));
        if (! (--worker_count))
          console.log(allLanguages);
      });
  };
} else {
  // const { parse } = require('some-js-parsing-library');
  // const script = workerData;
  console.log('New worker');
  let data = parseLanguage(workerData);
  parentPort.postMessage(data);
}