const db = require('../clients/mysql.js').connection;
const creds = require('../credentials/config.js')
const custom = require('../utils/addons.js').trustedusers;
const fetch = require('node-fetch')
const token = creds.token_ghiletofar
module.exports.run = async (obote, message, args, user, channel) => {
 if(channel !== '#ghiletofar'){
	if(channel === '#supinic'){
      return obote.say(channel, `${user.username}, command only avaible on channel ghiletofar FeelsDonkMan`)
	} else {
      return obote.say(channel, `${user.username}, comando apenas disponivel no canal ghiletofar, se quiser esse comando no seu canal entre em contato com o user namaca FeelsDonkMan`)
	}
}

  if(!args[0]){
    const fetching = (await fetch(`https://api.twitch.tv/kraken/channels/144746469`, {
			method: "GET",
			headers: {
				"Client-ID": creds.client_id,
				"Content-Type": 'application/json',
				Accept: 'application/vnd.twitchtv.v5+json',
				Authorization: 'OAuth ' + `${token}`,
			},			
	}).then(response => response.json()))

	return obote.say(channel, `${user.username}, ${channel.replace('#', '')} está jogando ${fetching.game} FeelsDonkMan`)
  } else {

  	if(!custom.includes(user['user-id'])){
  		obote.say(channel, `${user.username}, você não tem permissão para usar esse comando FeelsDonkMan`)
  	}
    const fetching = (await fetch(`https://api.twitch.tv/kraken/channels/144746469`, {
			method: "PUT",
			headers: {
				"Client-ID": creds.client_id,
				"Content-Type": 'application/json',
				Accept: 'application/vnd.twitchtv.v5+json',
				Authorization: 'OAuth ' + `${token}`,
			},
			body: JSON.stringify({ channel: { game: `${args.join(' ')}`} })
	}).then(response => response.json()))

  console.log(fetching)
  obote.say(channel, `${user.username}, jogo alterado para ${args.join(' ')}! FeelsDonkMan`)
  }
}




module.exports.config = {
	name: "game",
	aliases: ['jogo', 'setgame'],
	description: "Muda o jogo da stream",
    usage: 'game [JOGO]'
}

