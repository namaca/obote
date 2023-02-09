const db = require('../clients/mysql.js').connection
module.exports.run = async (obote, message, args, user, channel) => {
 if(user.username !== 'namaca')return
  if(!args[1]){
    obote.join(`${args[0]}`)
    obote.say(channel, 'Entrei nesse canal FeelsDonkMan 👍')
  }
  switch(args[1]){
    case '--save':
    db.query(`INSERT INTO obote_channels (channel, prefix, added)VALUES ("${args[0].toLowerCase()}", "+", CURRENT_TIMESTAMP)`, function(err, result){
    if(err) throw err
    obote.say(channel, `Entrei nesse canal permanentemente FeelsDonkMan 👍 `)
    obote.say(channel, `${user.username}, criando tabela de logs para esse canal.....`)
    obote.join(`${args[0]}`)

    db.query(`CREATE TABLE ${args[0]}_logs (
      ID INT NOT NULL AUTO_INCREMENT,
      USERNAME VARCHAR(400) NOT NULL,
      TEXT VARCHAR(400) NOT NULL,
      USER_ID int,
      DATE DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (ID)
    );`, function(err, result) {
      if(err) throw err;
      obote.say(channel, `${user.username}, criei a tabela ${args[0]}_logs`)
    })
   });
  break;
  }
 

 
 
}





module.exports.config = {
	name: "join",
	aliases: ['entrar'],
	description: "Me faz entrar em qualquer canal",
    usage: 'join [channel]'
}