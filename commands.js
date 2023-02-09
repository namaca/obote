const Discord = require('discord.js')
const obote = require('./clients/obote.js').client
const fs = require('fs')

obote.commands = new Discord.Collection()
obote.aliases = new Discord.Collection()
obote.afk = new Map()

fs.readdir("./commands", (err, files)  => { 
  if(err) console.log(err)

  let jsfile = files.filter(f => f.split('.').pop() === 'js')

  if(jsfile.length <= 0){
   
    return console.log(`[LOGS] NÃO ENCONTREI OS COMANDOS`);
  }

  jsfile.forEach((f, i)  =>{
    
    let pull = require(`./commands/${f}`)
    obote.commands.set(pull.config.name, pull)
    pull.config.aliases.forEach(alias  => {
      obote.aliases.set(alias, pull.config.name)
    })
  })
})
