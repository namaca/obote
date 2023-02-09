const db = require('../clients/mysql.js').connection
const ms = require('ms')
module.exports.run = async (obote, message, args, user, channel) => {
 if(channel !== '#ghiletofar'){
  if(channel === '#supinic'){
      return obote.say(channel, `${user.username}, command only avaible on channel ghiletofar FeelsDonkMan`)
  } else {
    if(channel !== '#lusfica'){
      return obote.say(channel, `${user.username}, comando apenas disponivel no canal ghiletofar, se quiser esse comando no seu canal entre em contato com o user namaca FeelsDonkMan`)
    }
  }
}
 db.query(`SELECT USERNAME,TEXT,DATE FROM ${channel.replace('#', '')}_logs`, function(err, result) {
 	if(err){
 		return obote.say(channel, `${user.username} alguma coisa deu errado FeelsDonkMan`)
 	}
   var Max = Math.floor(Math.random() * result.length)
   var myDate = new Date(result[Max].DATE);
   var time = myDate.getTime();
   var nowdate = Date.now()
   var diference = nowdate - time;
   var truetime = ms(diference)
    obote.say(channel, `(${truetime} atrás) ${result[Max].USERNAME}: ${result[Max].TEXT}`)
 })
}

module.exports.config = {
	name: "rl",
	aliases: ['randomline', 'randomphrase'],
	description: "Linha aleatoria do canal",
  usage: 'rl'
}