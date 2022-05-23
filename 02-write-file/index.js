const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');


const rl = readline.createInterface({ input, output });

fs.writeFile(path.join(__dirname, 'text.txt'),"", function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Файл создан,  вводите информацию:");
    }
});

rl.on('line', (input) => {
    if (input === 'exit') {console.log(
          "До свидания, ввод окончен"
        );    
        rl.close();}
else {
    fs.appendFile(path.join(__dirname, 'text.txt'), input + '\n',
function (error) {
        if(error) throw error; 
    });    
}
    }
    );
   
rl.on('SIGINT', () => {
    console.log(
        "До свидания, ввод окончен"
      );        rl.close();
});


