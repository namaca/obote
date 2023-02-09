const db = require('../clients/mysql.js').connection
module.exports.run = async (obote, message, args, user, channel) => {
 if(user.username !== 'namaca')return 
 
 if(!args[0])return
 db.query(`DELETE FROM obote_channels WHERE channel='${args[0]}'`, function(err, result) {
 	if(err){
 		console.log(err)
 		return client.say(channel, `@${user.username}: ${err} FeelsDonkMan !!! ! `)
 	}

 	obote.say(channel, `${user.username} saÍ desse canal com sucesso FeelsDonkMan`)
 })
}



module.exports.config = {
	name: "part",
	aliases: ['sair'],
	description: "Sair de qualquer canal na database",
    usage: 'part [channel]'
}