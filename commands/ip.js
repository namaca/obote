const custom  = require('../utils/functions.js')
const creds = require('../credentials/config.js')
const fetch = require('node-fetch');
module.exports.run = async (obote, message, args, user, channel) => { 
try {
			const locate = await fetch(`
				http://api.ipstack.com/${args.join(' ').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}?access_key=${creds.IP}`)
					.then(response => response.json());
			if (locate.type != null && custom.hasNumber(args[0])) {
				return obote.say(channel, `${user['username']}, local do ip ${args.join(' ')} tipo: ${locate.type}, país:
					${locate.country_name}, região: ${locate.region_name}, cidade: ${locate.city} monkaS`)
			}
			if (!args[0]) {
				return obote.say(channel,  `${user['username']}, use um ip valido. FeelsDonkMan`)
			} 

			if (!custom.hasNumber(args[0])) {
			  return obote.say(channel,  `${user['username']}, use um ip valido. FeelsDonkMan`)
			} 
			
			return obote.say(channel, `${user['username']}, nao consegui encontrar esse local FeelsDonkMan`)
			
		} catch (err) {
			if (err) {
				custom.errorLog(err.message)
				return obote.say(channel, `${user['username']}, nao consegui encontrar esse local FeelsDonkMan`)
			}
			custom.errorLog(err)
			return obote.say(channel, `${user['username']}, nao consegui encontrar esse local FeelsDonkMan`)
		}
}

module.exports.config = {
	name: "ip",
	aliases: ['findip', 'iptoplace'],
	description: "Encontra o local de um ip",
    usage: 'ip [ip]'
}