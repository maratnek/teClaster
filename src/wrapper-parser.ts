import { parse } from 'node-html-parser';
 
 
export let getTitle = (data : string)=>{
// let data : string = '<ul id="list"><li>Hello World</li></ul>';
    const root = parse(data);
    // console.log(root);
    let article = root.querySelector('article');
    let header = article.querySelector('p');
    console.log('header ', header);
//     console.log('Title: ', header.childNodes.reduce((t, n_t) =>{
//         console.log(t, n_t);
//  n_t += t.rawText;
//     });
let title = header.childNodes.reduce((t, n)=>{
        console.log(t, n);
 return n + t.rawText;
});
    // console.log('Title: ', title );
    console.log('Title: ', header.childNodes );
    // console.log(root.querySelector('article'));
    // console.log(root.firstChild.structure);
    // console.log('root ', root.valid);
    console.log(data);
    console.log('text', root.text);
    // console.log('html ', data);
};
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
console.log(root.toString());
// <ul id="list"><li>Hello World</li></ul>
// root.set_content('<li>Hello World</li>');
root.toString();	// <li>Hello World</li>