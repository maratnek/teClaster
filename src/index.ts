import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'url';

import { parseHtml, getLangOutput } from './parse';


const path_files: string = "../FirstData";
let files : string = [];

function lookFilesInDirectory(path_directory: string) {
  try {
    let stat = fs.statSync(path_directory);
    if (stat.isDirectory()) {
    //   console.log(path_directory);
      fs.readdirSync(path_directory).forEach((file, i) => {
        // console.log(`\t${file}`);
        if (i < 10) 
            lookFilesInDirectory(`${path_directory}/${file}`);
      });
    //   console.log();
    } else if (stat.isFile()) {
      if (path.extname(path_directory) == ".html") 
          files.push(path_directory);
    }
  } catch (err) {
    console.log("Stat error ", err);
  }
}

let path_view = './';

let start = async () => {
  await lookFilesInDirectory(path_files);
  console.log('Elem')
  files.forEach(elem => {
    //   console.log(elem);
      parseHtml(elem);
  })
  console.log(getLangOutput());
}

start();

// lookFilesInDirectory(path.join(__dirname, path_view));
