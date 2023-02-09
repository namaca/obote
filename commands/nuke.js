const db = require('../clients/mysql.js').connection;
const custom = require('../utils/addons.js').trustedusers;
const func = require('../utils/functions.js')
module.exports.run = async (obote, message, args, user, channel) => {
 if(channel !== '#ghiletofar')return
if(!custom.includes(user['user-id'])){
  		obote.say(channel, `${user.username}, você não tem permissão para usar esse comando FeelsDonkMan`)
   }
 db.query(`
 	SELECT *
    FROM ghiletofar_logs
    WHERE text LIKE '${args[0]}'
    ORDER BY DATE DESC
    LIMIT ${args[2]}`, function(err,results) {
    	if(err){
    		return obote.say(channel, `${user.username} ninguem mandou isso ou um erro ocorreu FeelsDonkMan`)
    	}
    	if(results[0] ===  undefined){
    		return obote.say(channel, `${user.username} ninguem mandou isso ou um erro ocorreu FeelsDonkMan`)
    	}
        for(result in Object.values(results))
        obote.timeout(channel, results[result].USERNAME, args[1])
    	console.log(results[result].USERNAME)
    })

}

module.exports.config = {
	name: "nuke",
	aliases: [],
	description: "Nuke em alguma mensagem",
    usage: 'nuke [MSG] [TIMEOUT-IN-SECONDS] [MESSAGE-LIMIT]'
}