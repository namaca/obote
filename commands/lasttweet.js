module.exports.run = (obote, message, args, user, channel) => {
  
   const unirest = require("unirest")
    
    var req = unirest("GET", `https://decapi.me/twitter/latest/${args[0]}`)
    
    req.end(function (res){
    
      if (args.join(" ").length === 0){
        
        return obote.say(channel,"Insira um do twitter FeelsDonkMan")
      }
      else {
      
      obote.say(channel,`${user.username} ${res.body}`)
      }
      
    })
    
  
  
  
}


module.exports.config = {
  name: "lasttweet",
  aliases: ["lt"],
  description: "Pega o último tweet de um usuário do Twitter",
  usage: "lasttweet [user]"
}