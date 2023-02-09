const custom = require('../utils/functions.js')
const ms = require('parse-ms')
const s = require('pretty-ms')
const connection = require('../clients/mysql.js').connection
const works = ['Programador', 'programador', 'Streamer', 'streamer', 'Chef', 'chef', 'artista', 'Artista']
const supiworks = ['Programmer', 'programmer', 'artist', 'Artist', 'chef', 'Chef', 'Streamer', 'streamer']
module.exports.run = async (obote, message, args, user, channel) => {

 connection.query(`UPDATE works_data SET work="Streamer" WHERE work='streamer';`, function(err,result) {
    if(err) throw err
  })
  connection.query(`UPDATE works_data SET work="Chef" WHERE work='chef';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Programador" WHERE work='programador';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Artista" WHERE work='artista';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Artist" WHERE work='artist';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Programmer" WHERE work='programmer';`, function(err,result) {
    if(err) throw err
 })

 const id = user['user-id']

 const prefix = await custom.dbQuery(`
  SELECT * FROM obote_channels
  WHERE channel='${channel.replace('#', '')}'
  `)

 const query =  await custom.dbQuery(`
  SELECT * FROM works_data
  WHERE id=${user['user-id']}
  `)
   

 if(query[0] === undefined){
  if(!args[0]){
    if(channel === '#supinic'){
      return obote.say(channel, `${user.username} hmmm.. seems like it's your first time working, use ${prefix[0].prefix}work Programmer, Streamer, Artist or Chef.  Okey`)
    } else {
      return obote.say(channel, `${user.username} hmm parece que é sua primeira vez trabalhando, use ${prefix[0].prefix}work Programador, Streamer ou Chef`)
    }
  }
  if(channel === '#supinic'){
    if(!supiworks.includes(args[0])){
   return obote.say(channel, `${user.username} this job is not avaible, use ${prefix[0].prefix}suggest to suggest a new job. Okey`)
  }
  } else {
   if(!works.includes(args[0])){
    return obote.say(channel, `${user.username} esse trabalho nao existe, use ${prefix[0].prefix}suggest para sugerir um novo FeelsDonkMan`)
   }
  }
  

  const createDb  = await custom.dbQuery(`
    INSERT INTO works_data (id,balance,bank,work,colldown,date)
    VALUES(${id},0,0,'${args[0]}',0,CURRENT_TIMESTAMP)
  `)

  
  connection.query(`UPDATE works_data SET work="Streamer" WHERE work='streamer';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Chef" WHERE work='chef';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Programador" WHERE work='programador';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Artista" WHERE work='artista';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Artist" WHERE work='artist';`, function(err,result) {
    if(err) throw err
 })
 connection.query(`UPDATE works_data SET work="Programmer" WHERE work='programmer';`, function(err,result) {
    if(err) throw err
 })
  if(channel === '#supinic'){
    obote.say(channel, `${user.username}, now your default job is ${args[0]}, work at least 2x per day to not get fired. peepoSadDank `)
  } else {
    obote.say(channel, `${user.username}, agora você esta trabalhando como ${args[0]}, trabalhe pelo menos 4x por dia para nao ser demitido TriSad .`)
  }
  
 } else {

  let workData = await custom.dbQuery(`
    SELECT * FROM works_data
    WHERE id=${user['user-id']}
  `)

  let timeoutcooldown = 3600000
  let truetime = workData[0].COLLDOWN
  let balance = workData[0].BALANCE
  let profisao = workData[0].WORK
  let money = Math.floor(Math.random() * 35)

  if(timeoutcooldown - (Date.now() - truetime) > 0){
   let something = s(timeoutcooldown - (Date.now() - truetime), {colonNotation: true})
   let worked = something.split(".")[0]
   if(channel === '#supinic'){
     obote.say(channel, `${user.username} you already worked. take a rest now, come back in (${worked}) Okey`)
   } else {
     obote.say(channel, `${user.username} seu work está em cooldown, espere (${worked}) TriSad`)
   }
  } else {
    if(channel  === '#supinic'){
     if(money < 15){
     obote.say(channel, `${user.username}, you worked as a ${profisao} and earned $${money} peepoSadDank`)
    } else {
      obote.say(channel, `${user.username}, you worked as a ${profisao} and earned $${money} Okey`)
    }
  } else {
    if(money < 15){
     obote.say(channel, `${user.username}, você trabalhou como ${profisao} e ganhou $${money} TriSad`)
    } else {
      obote.say(channel, `${user.username}, você trabalhou como ${profisao} e ganhou $${money} BRUHBRUH`)
    }
  }
        

   connection.query(`
    UPDATE works_data
    SET COLLDOWN=${Date.now()},
    BALANCE=${balance+money}
    WHERE ID=${user['user-id']}
  `, function(err,result) {
    if(err) throw err;
    
 })

   
  }



}



 






}

module.exports.config = {
	name: "work",
	aliases: ['w', 'trabalhar'],
	description: "Comando para trabalhar e ganhar uma quantidade de dinheiro",
  usage: 'work'
}