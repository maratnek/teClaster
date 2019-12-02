import * as fs from 'fs';
import * as path from 'path';

import { getLangOutput } from './parse';

let filesGlob : string = [];

export function getFiles(){return filesGlob;};

export function GetFilesInDirectory(path_directory: string, files: string[]) {
  // console.log('Get files in ', path_directory)
  try {
    let stat = fs.statSync(path_directory);
    if (stat.isDirectory()) {
      fs.readdirSync(path_directory).forEach((file, i) => {
            GetFilesInDirectory(`${path_directory}/${file}`, files);
      });
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

export function parseLanguage(path_directory:string){
  let files = [];
  GetFilesInDirectory(path_directory, files);
  console.log('Directory ', files.length);
  let data = getLangOutput(files);
  return {
    count: files.length,
    data: data
  };

}

export function lookFilesFirstIt(path_directory: string) {
    let folders : string[] = [];
    try {
      let stat = fs.statSync(path_directory);
      if (stat.isDirectory()) {
        fs.readdirSync(path_directory).forEach((file, i) => {
          folders.push(`${path_directory}/${file}`);
        });
      }
    } catch (err) {
      console.log("Stat error ", err);
    }
    return folders;
  }