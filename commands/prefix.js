const db = require('../clients/mysql.js').connection
module.exports.run = async (obote, message, args, user, channel) => {
  if(user.username !== channel.replace('#', '')){
    if(user.username !== 'namaca')return
  }
   
   if(!args[0])return obote.say(channel, `${user.username} erro no syntax, descreva o novo prefixo FeelsDonkMan`)

  db.query(`UPDATE obote_channels SET prefix='${args[0]}' WHERE channel='${channel.replace('#', '')}'`,  function(err, results) {
   	if(err){
      console.log(err)
      return obote.say(channel, `${user.username}, vish deu erro. FeelsDonkMan`)
    }

    obote.say(channel, `${user.username} prefixo alterado! PogChamp 👉  ${args[0]}`)
  })
}

module.exports.config = {
	name: "prefix",
	aliases: ['pr', 'setprefix'],
	description: "Muda o prefixo do canal",
  usage: 'prefix [PREFIX]'
}