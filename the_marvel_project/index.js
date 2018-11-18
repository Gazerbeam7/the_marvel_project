#!/usr/bin/env node

//VARIABLES
const program = require('commander')
const inquirer = require('inquirer')
const fs =require('fs')


//COMMANDER 
//settings config
program
.version('1.0.0')
.option('-a, --all', 'list all characters')
.option('-s, --spiderman', 'show spider-man')
.option('-H, --hulk', 'show hulk')
.option('-t, --thor', 'show Thor')
program.parse(process.argv)


//API SETTINGS
let api = require('marvel-api');

let marvel = api.createClient({
publicKey: '65beba3a58682fa246dd3c024a437728'
, privateKey: '1e525d6778fe7371d4788d76ce0d3d4475d94063'
});



//INQUIRER
inquirer.prompt([
{
  type:'input',
  message:'Which hero are you looking for ?',
  name:'character'
}
]).then((answers) =>{
  marvel.characters.findByName(answers.character)
  .then(console.log)
  .fail(console.error)
  .done()
})


//FILSYSTEM
try{
  //write a file
  fs.writeFile('message.txt', 'Bonjour !', (err) => {
    if(err) throw err
  })

  //read a file
  fs.readFile('message.txt', 'utf-8', (err, data)=>{
    if(err) throw err
  })
}
catch(err){
  console.error('ERR >', err)
}



//API CALLS

//we look for all the characters
if(program.all){
  marvel.characters.findAll()
  .then(console.log)
  .fail(console.error)
  .done()
}

//we look for thor
if(program.thor){
  marvel.characters.findByName("thor")
  .then(console.log)
  .fail(console.error)
  .done()
}

//we look for hulk
if(program.hulk){
  marvel.characters.findByName("hulk")
  .then(console.log)
  .fail(console.error)
  .done()
}

//we look for spiderman
if(program.spiderman){
  marvel.characters.findByName("spider-man")
  .then(console.log)
  .fail(console.error)
  .done()
}

/*else {
  program.help()
}*/