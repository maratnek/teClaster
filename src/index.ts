import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'url';

import { parseHtml } from './parse';


const path_files: string = "../FirstData";
function lookFilesInDirectory(path_directory : string) {
    fs.stat(path_directory, (err, stat) => {
        if (!err) {
            if (stat.isDirectory()) {
                console.log(path_directory)
                fs.readdirSync(path_directory).forEach((file, i) => {
                    // console.log(`\t${file}`);
                    if (i < 2)
                        lookFilesInDirectory(`${path_directory}/${file}`);
                });
                console.log();
            } else if (stat.isFile()) {
                console.log('is file', path_directory);
                if (path.extname(path_directory) == '.html')
                    parseHtml(path_directory);
            }
        }
    });
}

let path_view = './';
lookFilesInDirectory(path_files);
// lookFilesInDirectory(path.join(__dirname, path_view));
