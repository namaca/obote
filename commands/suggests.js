const db = require('../clients/mysql.js').connection
module.exports.run = async (obote, message, args, user, channel) => {


  if(!args[0]){
 	return obote.say(channel, `${user.username} providencie uma suggestão, se tu não me falar nada fica foda pra eu adivinhar FeelsDonkMan`)
  }
  db.query(`SELECT ID FROM obote_suggests`, function (err, result)  {
    	if(err) throw err;

        const total = result.length

        db.query(`
  	INSERT INTO obote_suggests (USERNAME,TEXT,USER_ID)
  	VALUES ('${user.username}','${args.join(' ')}',${user['user-id']});
  	`, function(err, result) {
  		if(err) throw err;

  		obote.say(channel, `${user.username}, sua sugestão foi anotada e eventualmente sera lida (ID: ${total}) FeelsDonkMan 👍 `)
  	})
 	})

  



}

module.exports.config = {
	name: "suggest",
	aliases: ['sugerir', 'sugestão'],
	description: "Comando para dar alguma sugestao para o bot.",
    usage: 'suggest [suggestao]'
}