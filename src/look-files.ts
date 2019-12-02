import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'url';

import { parseHtml, getLangOutput } from './parse';


const path_files: string = "../TeContests/DataClusteringSample0107/";
let filesGlob : string = [];

export function getFiles(){return filesGlob;};

export function GetFilesInDirectory(path_directory: string, files: string[]) {
  // console.log('Get files in ', path_directory)
  try {
    let stat = fs.statSync(path_directory);
    if (stat.isDirectory()) {
      fs.readdirSync(path_directory).forEach((file, i) => {
        // if (i < 5) 
            GetFilesInDirectory(`${path_directory}/${file}`, files);
      });
    } else if (stat.isFile()) {
      if (path.extname(path_directory) == ".html") 
      {
        // console.log('return');
        files.push(path_directory);
      }
    }
  } catch (err) {
    console.log("Stat error ", err);
  }
}

export function parseLanguage(path_directory:string){
  console.log('parse Language');
  let files = [];
  GetFilesInDirectory(path_directory, files);
  console.log('Directory ', files.length);
  let data = getLangOutput(files);
  // console.log(data[0].count + data[1].count + data[2].count);
  // console.log(data[2]);
  return {
    count: files.length,
    data: data
  };

}


export function lookFilesInDirectory(path_directory: string) {
  // console.log('Look files in ', path_directory)
  try {
    let stat = fs.statSync(path_directory);
    if (stat.isDirectory()) {
      // console.log(path_directory);
      fs.readdirSync(path_directory).forEach((file, i) => {
        // console.log(`\t${file}`);
        if (i < 5) 
            lookFilesInDirectory(`${path_directory}/${file}`);
      });
    //   console.log();
    } else if (stat.isFile()) {
      if (path.extname(path_directory) == ".html") 
      {
          files.push(path_directory);
      }
    }
  } catch (err) {
    console.log("Stat error ", err);
  }
}

let path_view = './';

let start = async () => {
  lookFilesInDirectory(path_files);
  console.log('Elem')
  files.forEach(elem  => {
    //   console.log(elem);
      parseHtml(elem);
  })
  console.log(getLangOutput());
}

// start();

export function lookFilesFirstIt(path_directory: string) {
    let folders : string[] = [];
    try {
      let stat = fs.statSync(path_directory);
      if (stat.isDirectory()) {
      //   console.log(path_directory);
        fs.readdirSync(path_directory).forEach((file, i) => {
          // console.log(`\t${file}`);
          folders.push(`${path_directory}/${file}`);
        //   if (i < 4) 
            //   lookFilesInDirectory(`${path_directory}/${file}`);
        });
      }
    } catch (err) {
      console.log("Stat error ", err);
    }
    return folders;
  }