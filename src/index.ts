import {lookFilesFirstIt, 
        parseLanguage
        } from './look-files';

import { emptyLanguages } from './parse';

const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

function startMainThread(path_files : string) {
  // const path_files: string = "../TeContests/DataClusteringSample0107";
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
        files_count += mes.count;
        addData(mes.data);
      });
      worker.on('exit', (code : number) => {
        console.log('count files ', files_count);
        if (code !== 0)
          console.log(new Error(`Worker stopped with exit code ${code}`));
        if (! (--worker_count))
          console.log(allLanguages);
      });
  };
}

if (isMainThread) {
  console.log('Create main thread');
  var args = process.argv.slice(2);
  
  let next = false;
  if (args[0] == 'languages' && args[1] != '')
    startMainThread(args[1]);
  
} else {
  let data = parseLanguage(workerData);
  parentPort.postMessage(data);
}