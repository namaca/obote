module.exports.run = async (obote, message, args, user, channel) => {
 let reason = args.join(' ') || '👷'
 let getUserData = await obote.doQuery(`SELECT * FROM user_alias WHERE user_id=${user['user-id']}`)
 let userData = getUserData.rows[0]
 let user_alias = userData.id
 await obote.doQuery(`INSERT 
  INTO obote_afk(username, user_alias, message, active, twitch_id, status) 
  VALUES('${userData.display_name}', '${user_alias}', '${reason}', 'true', '${userData.user_id}', 'trabalhando')`)

  obote.say(channel, `${user.username} está trabalhando: ${reason}`)
}
    

module.exports.config = {
  name: "work",
  aliases: ['trabalhar'],
  description: "Seta você como afk com status de 'trabalhando', suporta uma mensagem personalizada",
  usage: '+work FeelsBadMan',
  colldown: 5000,
  level: 'Everyone'
}