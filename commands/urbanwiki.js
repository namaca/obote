module.exports.run = (obote, message, args, user, channel) => {
  
const unirest = require("unirest");

let req = unirest("GET", "https://mashape-community-urban-dictionary.p.rapidapi.com/define");

req.query({
	"term": args.join(" ")
});

req.headers({
	"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
	"x-rapidapi-key": "0c01d9eb32msh1fed7589a51207dp1e2df4jsne0a034176750",
	"useQueryString": true
});


req.end(function (res) {
  try {
  let data = res.body.list[0].definition
  let str = data.replace(/\[/g, "")
  str = str.replace(/\]/g, "")
  str = str.slice(0, 480)
  

	obote.say(channel, `${str}...`)
  

  } catch (err) {
    obote.say(channel, `${user.username} não encontrei a definição disso FeelsDonkMan `)
  }
})
  
  
}


module.exports.config = {
  name: "urbanwiki",
  aliases: ["uk"],
  description: "Pesquisa um termo através do UrbanDictionary",
  usage: "urbanwiki [termo]"
}