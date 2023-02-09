module.exports.run = async (obote, message, args, user, channel) => {
  try{
    const SpacexApiWrapper = require("spacex-api-wrapper");
			const space = await SpacexApiWrapper.getNextLaunch();
			const date = await space.launch_date_utc;
			const serverDate = new Date();
			const diff = Math.abs(serverDate - new Date(date))
			const DifftoSeconds = (diff / 1000).toFixed(0);
			const toHours = (DifftoSeconds / 3600).toFixed(0);
      const custom = require('../utils/functions.js');
    
  
  if (toHours > 72) {
    obote.say(channel, `Proximo foguete vai ser lançado pela SpaceX em ${(toHours / 24).toFixed(0)} dias, 
				fogete ${space.rocket.rocket_name}, missão ${space.mission_name}, 
				${space.launch_site.site_name_long}, reddit: ${space.links.reddit_campaign || "Indisponível"}`)
  } else {
    obote.say(channel, `Proximo foguete vai ser lançado pela SpaceX em ${custom.formatUptime(DifftoSeconds)}, fogete 
			${space.rocket.rocket_name}, missão ${space.mission_name}, 
			${space.launch_site.site_name_long}, reddit: ${space.links.reddit_campaign || "Indisponível"}`)
}
    
} catch(err){
  obote.say(channel, `${user.username} ${err} FeelsDonkMan !! !!`)
  console.log(err)
}
     
  
}

module.exports.config = {
	name:  "spacex",
	aliases: ['spacex', 'space'],
	description: "Informações sobre o proximo lançamento da spacex",
  usage: 'spacex'
}