import {ya_tr} from './language';
import {getTitle} from './wrapper-parser';
import * as fs from 'fs';


export let parseHtml = (filename : string)=>{
    console.log('Html file parse and check language', filename);
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err)
            return console.log('Error read file ', err);
        getTitle(data);
    });


    let title : string = '';
    // ya_tr.detect(title, (err, result)=> {
    //     if (err)
    //         return console.log('Error ', err);
    //     console.log(result);
    // });
};