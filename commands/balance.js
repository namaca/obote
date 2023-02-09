const custom  = require('../utils/functions.js')
const creds = require('../credentials/config.js')
const fetch = require('node-fetch');
module.exports.run = async (obote, message, args, user, channel) => { 
 if(!args[0]){
    let work = await custom.dbQuery(`
 	SELECT * FROM works_data
 	WHERE id=${user['user-id']}
    `)
    if(channel === '#supinic'){
    	if(work[0].BALANCE === undefined){
    	return obote.say(channel, `${user.username} seems like you havent worked before, use ;work FeelsDonkMan`)
     }
     obote.say(channel, `${user.username}, you have ${work[0].BALANCE} on your wallet 💸`)
    } else {
     if(work[0].BALANCE === undefined){
    	return obote.say(channel, `${user.username} você ainda não trabalhou FeelsDonkMan`)
     }
     obote.say(channel, `${user.username}, você tem ${work[0].BALANCE} na carteira 💸`)
    }
 } else {
 	let id = await custom.dbQuery(`
 		SELECT * FROM user_alias
 		WHERE USERNAME='${args[0]}'
 	`)
 	if(id[0] === undefined){
 		return obote.say(channel, `${user.username} não encontrei esse usuario na database. FeelsDonkMan`)
 	} else {
 		let work = await custom.dbQuery(`
 			SELECT * FROM works_data
 			WHERE id=${id[0].ID}
 		`)
       if(channel === '#supinic'){ 
        obote.say(channel, `${user.username}, ${id[0].DISPLAY_NAME} has $${work[0].BALANCE} on his wallet 💸 `)
       } else {
        obote.say(channel, `${user.username}, ${id[0].DISPLAY_NAME} tem $${work[0].BALANCE} na carteira 💸 `)
       }
 		
 	}
 }







}

module.exports.config = {
	name: "balance",
	aliases: ['bal', 'b'],
	description: "Quantidade de dinheiro que um usuario tem",
    usage: 'balance [user]'
}