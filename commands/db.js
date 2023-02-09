const db = require('../clients/mysql.js').connection
module.exports.run = async (obote, message, args, user, channel) => {

 if(user.username !==  'namaca')return;

 db.query(`${args.join(' ')}`, function(err,result) {
  if(err) throw  err;

  obote.say(channel,  `@${user.username} feito! FeelsDonkMan `)
 })


}

module.exports.config = {
	name: "db",
	aliases: ['database', 'mysql'],
	description: "Edita coisas da mysql",
  usage: 'db'
}