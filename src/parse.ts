import {ya_tr} from './language';
import {getTitle, 
    getArticleStruct, 
    getLanguage,
    getHtmlStruct} from './wrapper-parser';
import * as fs from 'fs';
import * as path from 'path';

const Filequeue = require('filequeue');
const fq = new Filequeue(200); // max number of files to open at once

function createDirRecursively(dir: string) {
    if (!fs.existsSync(dir)) {        
        createDirRecursively(path.join(dir, ".."));
        fs.mkdirSync(dir);
    }
}

let createOutput = (filename : string, data : string) => {
        let folder = new_folder + '/' + path.dirname(filename).substr(3);
        let out_filename : string = folder + '/' + path.basename(filename);
        // console.log('folder', folder);
        createDirRecursively(folder);
        fq.writeFile(out_filename, data, (err : any) => {
            if (err)
                console.log('Error write file ', err);
        });
        // console.log(artStr);
        // console.log(out_filename);
};

let new_folder :string = 'structure';

export let parseHtml = (filename : string)=>{
    // console.log('Html file parse and check language', filename);
    // try {
    //     let data: string = fs.readFileSync(filename, 'utf8');
    //     createOutput(filename, getHtmlStruct(data));
    // } catch(err) {
    //     console.log("Error read file ", err);
    // }
    fq.readFile(filename, 'utf8', (err : any, data : string) => {
        if (err)
            return console.log('Error read file ', err);
        // getTitle(data);
        // let artStr : string = getArticleStruct(data);
        // html struct files
        // createOutput(filename, getHtmlStruct(data));
        // define ru or en
        createOutput(filename, getLanguage(data));
    });



    // let title : string = '';
    // ya_tr.detect(title, (err, result)=> {
    //     if (err)
    //         return console.log('Error ', err);
    //     console.log(result);
    // });
};