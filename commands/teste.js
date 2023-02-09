const db = require('../clients/mysql.js').connection;
const creds = require('../credentials/config.js')
const fetch = require('node-fetch')
const custom = require('../utils/functions.js')
module.exports.run = async (obote, message, args, user, channel) => {
  if(user.username !== 'namaca')return
 
 
	

}




module.exports.config = {
	name: "teste",
	aliases: ['test'],
	description: "Teste foda BRUHBRUH",
    usage: 'teste'
}

