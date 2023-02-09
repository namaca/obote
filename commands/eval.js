const custom = require('../utils/functions.js')
module.exports.run = async (obote, message, args, user, channel) => {
 if(user.username !== 'namaca')return;
 
 const toEval = args.join(' ')
 const evalueted = eval(toEval)

 obote.say(channel, `${evalueted}`)

}

module.exports.config = {
	name: "eval",
	aliases: ['evaluate'],
	description: "Eval moderation stuff",
    usage: 'eval [eval]'
}