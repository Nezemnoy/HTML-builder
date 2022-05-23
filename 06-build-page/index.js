const fs = require('fs');
const path = require('path');
const { readdir } = require ('fs/promises');
const { mkdir, copyFile} = require ('fs');


let tegs = [];
let names = [];
let teg ='';
let ext = '';
let readStream;
let components = [];
let stylesArr =[];
let assetsArr =[];
let subDir = [];


try {

    (async () =>{
    
    let  assetsPath ='';

    async function makeAssetsPathArr (assetsPath) {
       
        let assets = await readdir(path.join(__dirname,"/assets"+assetsPath), { withFileTypes: true });
          for (const file of assets) {
             if(file.isFile())  
               {
                 assetsArr.push(assetsPath+'/'+file.name);
                }       

             else {
                 subDir.push(file.name)
                 assetsPath = '/'+file.name;
                 makeAssetsPathArr(assetsPath) 
             }
          }
          

        }
   const promise = await makeAssetsPathArr(assetsPath);
   async function makeDir (subDir){

    for (let i = 0; i< subDir.length;i++)
    {
    mkdir(path.join(__dirname,`./project-dist/assets/${subDir[i]}`), { recursive: true }, (err) => {
        if (err) throw err;
        });
        
    }
  }

  const res = await makeDir(subDir);

    const files = await readdir(path.join(__dirname,'/components'), {withFileTypes: true });
    for (const file of files) {
    if((file.isFile())&&(path.extname(file.name)=='.html'))  
    names.push(file.name)
    }

    const styles= await readdir(path.join(__dirname,'/styles'), {withFileTypes: true });
    for (const file of styles) {
    if((file.isFile())&&(path.extname(file.name)=='.css'))  
    stylesArr.push(file.name)
    }

    for (let i=0; i<names.length; i++)
    {     
    ext = path.extname(path.join(__dirname,`./components/${names[i]}`));
    teg =  path.basename(path.join(__dirname,`./components/${names[i]}`), ext);

    readStream = fs.createReadStream(path.join(__dirname,`/components/${names[i]}`), 'utf-8');
    readStream.on('data', chunk => {
    components[i] = chunk;
});
    
    tegs.push(`{{${teg}}}`)
    
}

readStream.on('end', () => {
   
     const readStreamTemplate = fs.createReadStream(path.join(__dirname,"template.html"), 'utf-8');
     const writeStreamIndex = fs.createWriteStream(path.join(__dirname,"/project-dist/index.html"));
     readStreamTemplate.on('data', chunk => {

    for (let i=0; i<names.length; i++){
    chunk = chunk.replace(tegs[i], components[i])
     }
    writeStreamIndex.write(chunk);
    });    

    const  writeStreamStyles= fs.createWriteStream(path.join(__dirname,'/project-dist/style.css'));

    for (let i = 0; i<stylesArr.length; i++){
    const readStreamStyles = fs.createReadStream(path.join(__dirname,`/styles/${stylesArr[i]}`), 'utf-8');
    readStreamStyles.pipe(writeStreamStyles);
    }
    readStreamTemplate.on('end', () => {

    function call(err) {if (err) throw err;}
    for (let i = 0; i<assetsArr.length; i++){
    copyFile(path.join(__dirname,`./assets${assetsArr[i]}`), path.join(__dirname,`/project-dist/assets${assetsArr[i]}`), call);
    }
});
});


    })();
    
    } catch (err) {
      console.error(err);
    }
    
