const custom = require('../utils/functions.js')
module.exports.run = async (obote, message, args, user, channel) => {
  if(message.includes(' 󠀀')){
    return 
}
const prefix = await custom.dbQuery(`
  SELECT prefix FROM obote_channels 
  WHERE channel='${channel.replace('#', '')}'
  `)

 if(channel === '#supinic'){
  if(!args[0]){
    let commands = obote.commands.map(c => `${c.config.name}`).join(' / ')
    obote.whisper(`${user.username}`, `${user.username}, prefix: ${prefix[0].prefix} commands: ${commands}`)
    obote.say(channel, `${user.username}, check your whispers Okey `)
      
      
   } else {
       let command = obote.commands.get(obote.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
       if(!command) return obote.say(channel,`could not find the command '${args[0]}' FeelsDonkMan`)
     command = command.config;
     obote.whisper(`${user.username}`, `${user.username}, ${prefix[0].prefix}${command.usage} : ${command.description}, Apelidos: ( ${command.aliases.join(', ')} )`)
     obote.say(channel, `${user.username}, check your whispers Okey`)
   }
 } else {
  if(!args[0]){
    let commands = obote.commands.map(c => `${c.config.name}`).join(' / ')
    obote.whisper(`${user.username}`, `${user.username}, Prefixo: ${prefix[0].prefix}; Comandos: ${commands}`)
    obote.say(channel, `${user.username}, acabei de te mandar um whisper PPogo `)
      
      
   } else {
       let command = obote.commands.get(obote.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
       if(!command) return obote.say(channel, `Não encontrei o comando ${args[0]}   FeelsDonkMan`)
     command = command.config;
     obote.whisper(`${user.username}`, `${user.username}, ${prefix[0].prefix}${command.usage} : ${command.description}, Apelidos: ( ${command.aliases.join(', ')} )`)
     obote.say(channel, `${user.username}, acabei de te mandar um whisper com informaçoes sobre esse comando PPogo`)
   }
 }

}
    
  
  
  


module.exports.config = {
	name:  "help",
	aliases: ['ajuda', 'comandos'],
	description: "Informações sobre os meus comandos",
  usage: 'help [comando]'
}