const custom = require('../utils/functions.js')
const ms = require('ms')
module.exports.run = async (obote, message, args, user, channel) => {
 const queryUptime = await custom.dbQuery(`
  SELECT * FROM obote_status
  WHERE Status='online'
  ORDER BY Uptime DESC
  LIMIT 1
    `)
 const Uptime = queryUptime[0].Uptime
 const uptimeDate = new Date(Uptime);
 const uptimeMs = uptimeDate.getTime();
 const nowdate = Date.now()
 const diference = nowdate - uptimeMs;
 const uptime = ms(diference)
 const usage = custom.formatBytes(process.memoryUsage().heapUsed) 
 const Node = process.version;
 const total = custom.formatBytes(process.memoryUsage().heapTotal)
 if(channel === '#supinic'){
      obote.ping().then(function(data){
    

       let ping = Math.floor(Math.round(data*1000))
        obote.say(channel, `Pong! Twitch Latency: ${ping}ms; Node: ${Node}; Used Memory: ${usage}/${total}; Uptime: ${uptime}; Commands: ${obote.commands.size};`)
});
    }else{
      obote.ping().then(function(data){
    

       let ping = Math.floor(Math.round(data*1000))
        obote.say(channel, `Pong! Latencia da twitch: ${ping}ms; Node: ${Node}; Memoria usada: ${usage}/${total}; Uptime: ${uptime}; Comandos carregados: ${obote.commands.size}; https://oobote.glitch.me `)
});
}




}

module.exports.config = {
	name: "ping",
	aliases: ['stats'],
	description: "Ping/status do bot",
    usage: 'ping'
}