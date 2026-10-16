import {cpSync,mkdirSync} from 'node:fs';
const source=new URL('../public/',import.meta.url),target=new URL('../dist/',import.meta.url);
mkdirSync(target,{recursive:true});cpSync(source,target,{recursive:true});
console.log('Built RetroBid static preview in dist/');
