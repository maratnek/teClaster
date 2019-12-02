import { 
    getLanguage,
    ELanguage
    } from './wrapper-parser';
import * as fs from 'fs';
import * as path from 'path';

const Filequeue = require('filequeue');
const fq = new Filequeue(200); // max number of files to open at once

let languages : any = [];
let languageClear = () => {
languages = [];
languages.push({"lang_code":"en", "articles":[], "count":0});
languages.push({"lang_code":"ru", "articles":[], "count":0});
languages.push({"lang_code":"other", "articles":[], "count":0});
}

export function emptyLanguages() {
let languages = [];
languages.push({"lang_code":"en", "articles":[], "count":0});
languages.push({"lang_code":"ru", "articles":[], "count":0});
languages.push({"lang_code":"other", "articles":[], "count":0});
    return languages; 
}


function createDirRecursively(dir: string) {
    if (!fs.existsSync(dir)) {        
        createDirRecursively(path.join(dir, ".."));
        fs.mkdirSync(dir);
    }
}

let createOutput = (filename : string, data : string) => {
        let folder = new_folder + '/' + path.dirname(filename).substr(3);
        let out_filename : string = folder + '/' + path.basename(filename);
        createDirRecursively(folder);
        fq.writeFile(out_filename, data, (err : any) => {
            if (err)
                console.log('Error write file ', err);
        });
};

let new_folder :string = 'structure';

let addLang = (filename:string, data: string) => {
        switch (getLanguage(data)) {
          case ELanguage.en:
            languages[0].articles.push(path.basename(filename));
            languages[0].count++;
            break;
          case ELanguage.ru:
            languages[1].articles.push(path.basename(filename));
            languages[1].count++;
            break;
          case ELanguage.other:
            languages[2].articles.push(path.basename(filename));
            languages[2].count++;
            break;
          default:
            console.log('Not known lang');
            break;
        }
};

export let parseHtml = (filename : string)=>{
    try {
        let data: string = fs.readFileSync(filename, 'utf8');
        addLang(filename, data);
    } catch(err) {
        console.log("Error read file ", err);
    }
};

export function getLangOutput(files : any) {
    languageClear();
    files.forEach(elem => {
      parseHtml(elem);
    });
    return languages;
}