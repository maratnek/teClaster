import { parse } from 'node-html-parser';

import {ya_tr} from './language';
 
 
export let getTitle = (data : string)=>{
// let data : string = '<ul id="list"><li>Hello World</li></ul>';
    const root : any = parse(data);
    // console.log(root);
    let article = root.querySelector('article');
    let header = article.querySelector('p');
    console.log('header ', header);
let title = header.childNodes.reduce((t : any, n : any) => {
  console.log(t, n);
  return n + t.rawText;
});
    console.log('Title: ', title );
    // console.log('Title: ', header.childNodes );
    // console.log(root.querySelector('article'));
    // console.log(root.firstChild.structure);
    console.log(article.structure);
    return article.structure;
    // console.log('root ', root.valid);
    // console.log('text', root.text);
    // console.log('html ', data);
};

export let getArticleStruct = (data: string) : string => {
    const root : any = parse(data);
    let article = root.querySelector('article');
    // console.log(article.structure);
    return article.structure;
}

export let getHtmlStruct = (data: string) : string => {
    const root : any = parse(data);
    // let article = root.querySelector('article');
    // console.log(article.structure);
    return root.structure;
}

export enum ELanguage {
    en = 1,
    ru,
    other
}

export let getLanguage = (data: string) : ELanguage => {
    const root : any = parse(data);
    // let article = root.querySelector('article');

    // console.log('text', root.text);

    let text = root.text;
    ya_tr.detect(text, (err : any, result : any)=> {
        if (err)
            return console.log('Error ', err);
        // console.log(result.lang);
        console.log('Language ', result.lang);
        if (result.lang == 'en')
            return ELanguage.en
        else if (result.lang == 'ru')
            return ELanguage.ru
        else
            return ELanguage.other
    });
    // console.log(article.structure);
    // return root.structure;
}

// console.log(root.firstChild.structure);
// ul#list
//   li
//     #text
 
// console.log(root.querySelector('#list'));
// { tagName: 'ul',
//   rawAttrs: 'id="list"',
//   childNodes:
//    [ { tagName: 'li',
//        rawAttrs: '',
//        childNodes: [Object],
//        classNames: [] } ],
//   id: 'list',
//   classNames: [] }
// console.log(root.toString());
// <ul id="list"><li>Hello World</li></ul>
// root.set_content('<li>Hello World</li>');
// root.toString();	// <li>Hello World</li>