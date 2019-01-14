// (function (exports, require, module, __filename, __dirname) {
// var x =;



console.log(__filename);

// })

const path = require('path');

const pathObject = path.parse(__filename);
console.log(pathObject);

const os = require('os');

console.log('Total memory', os.totalmem());
console.log(`${os.totalmem()}`);


const fs = require('fs');
const filesSync = fs.readdirSync('./');
console.log('sync file read...', filesSync);

fs.readdir('./', (err,files) => {
   if(err) console.log('Error: ', err);
   else console.log('Success and result: ', files);
});
