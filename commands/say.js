module.exports.run = async (obote, message, args, user, channel) => {

if(!args[0])return obote.say(channel, `${user.username}, oq eu deveria falar?`)
  
  obote.say(channel, ` 󠀀 ${args.join(' ')} `)
}

module.exports.config = {
	name: "say",
	aliases: ['falar', 'dizer'],
	description: "Me faz falar oq vc quiser, qualquer coisa... menos aqui cmonBruh",
    usage: 'say [msg]'
}