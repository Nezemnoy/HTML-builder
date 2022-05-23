const fs = require('fs');
const path = require('path');
const { readdir } = require ('fs/promises');
const { access } = require ('fs');

let arr = [];

try {

    (async () =>{
    
        let readStream;
        let writeStream;

        access(path.join(__dirname,'/project-dist/bundle.css'), function(error){
            if (error) {
            
            writeStream = fs.createWriteStream(path.join(__dirname,'/project-dist/bundle.css'));

            } else {
            fs.unlink(path.join(__dirname,'/project-dist/bundle.css'), (err) => {

            if (err) throw err;})

            writeStream = fs.createWriteStream(path.join(__dirname,'/project-dist/bundle.css'));

            }
        });
   
    const files= await readdir(path.join(__dirname,'/styles'), {withFileTypes: true });
    for (const file of files) {
        if((file.isFile())&&(path.extname(file.name)=='.css'))  
        arr.push(file.name)
    }
    
    
    for (let i = 0; i<arr.length; i++){

    readStream = fs.createReadStream(path.join(__dirname,`/styles/${arr[i]}`), 'utf-8');
    readStream.pipe(writeStream);

    }
        
    })();
    
    } catch (err) {
      console.error(err);
    }
    