const { mkdir, rm, access } = require ('fs');
const { copyFile } =  require ('fs');
const path = require('path');
const { readdir } = require ('fs/promises');
let arr =[];


try {

    (async () =>{

      async function remDir(){

            access(path.join(__dirname,'./files-copy'), function(error){
            if (error) {
            mkdir(path.join(__dirname,'./files-copy'), { recursive: true }, (err) => {
                    if (err) throw err;
                  });
            } else {
            rm(path.join(__dirname,'./files-copy'), { recursive: true }, (err) => {
                    if (err)  {
                      mkdir(path.join(__dirname,'./files-copy'), { recursive: true }, (err) => {
                      if (err) throw err;
                }); 
              }
          });  
                    
        }        
      });
    }

       const res = await remDir();

       const files = await readdir(path.join(__dirname,'/files'), { withFileTypes: true });
          for (const file of files) {
             if(file.isFile())  
             arr.push(file.name)
          }
         
        for (let i = 0; i<arr.length; i++){

        function callback(err) {if (err) throw err;}
   
copyFile(path.join(__dirname,`./files/${arr[i]}`), path.join(__dirname,`./files-copy/${arr[i]}`), callback);

    }
    })();
    
    } catch (err) {
      console.error(err);
    }