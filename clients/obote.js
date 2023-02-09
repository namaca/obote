const tmi = require('tmi.js')
const config = require('../credentials/config.js')
const channels = require('../credentials/login.js').channelOptions;
const custom = require('../utils/functions.js')
const client = new tmi.client({
  options: {
    debug: false,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "obote",
    password: config.PASSWORD_OBOTE,
  },
  channels: channels
})


client.connect()
client.on('connected', async () => {
  const usage = custom.formatBytes(process.memoryUsage().heapUsed) 
 console.log('Twitch bot online')
 console.log(await getChannel(2))
 custom.dbQuery(`
  INSERT INTO obote_status(Memoria,status,uptime)
  VALUES('${usage}','online',CURRENT_TIMESTAMP)
  `)
})

module.exports = { client }


async function getChannel(number){
 let a = await custom.dbQuery(`
  SELECT * FROM obote_channels
  WHERE id=${number}
  `)

 return a[0].channel
}