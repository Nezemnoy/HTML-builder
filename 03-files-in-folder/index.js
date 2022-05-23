const fs = require('fs');
const path = require('path');
const { readdir } = require ('fs/promises');
const { stat } = require ('fs');
let ext = '';
let name = '';
let arr = [];

try {

(async () =>{

  const files= await readdir(path.join(__dirname,'/secret-folder'), { withFileTypes: true });
  for (const file of files) {
    if(file.isFile())  
    arr.push(file.name)
}
    for (let i = 0; i<arr.length; i++){

stat(path.join(__dirname,`./secret-folder/${arr[i]}`), (err, stats) => {
ext = path.extname(path.join(__dirname,`./secret-folder/${arr[i]}`));
name = path.basename(path.join(__dirname,`./secret-folder/${arr[i]}`), ext);
    
console.log (name+' - '+ext.slice(1)+' - '+stats.size+'b')

});

    }
})();

} catch (err) {
  console.error(err);
}

 


