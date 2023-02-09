const unirest = require("unirest")

const { flag } = require("country-emoji")

module.exports.run = async (obote, message, args, user, channel) => {
 if(user.username !== 'namaca')return 
 

  var req = unirest("GET", `https://corona.lmao.ninja/v2/all`)
  
  var reqx = unirest("GET", `https://corona.lmao.ninja/v2/countries/${args[0]}`)
  
  if (args.join(" ").length === 0) {
    
    req.end(function (res){
      
  let state = res.body.state
  let country = res.body.country
  let cases = res.body.cases.toLocaleString().replace(/,/g, ' ') 
  let recovered = res.body.recovered.toLocaleString().replace(/,/g, ' ') 
  let todayCases = res.body.todayCases.toLocaleString().replace(/,/g, ' ') 
  let critical = res.body.critical.toLocaleString().replace(/,/g, ' ')    
  let todayDeaths = res.body.todayDeaths.toLocaleString().replace(/,/g, ' ') 
  let deaths = res.body.deaths.toLocaleString().replace(/,/g, ' ') 
  let affectedCountries = res.body.affectedCountries    
  let emoji = flag(country) 
  
  
  return  obote.say(channel, ` ${user.username}, \u{1F30E} está com ${cases}(+${todayCases}) casos confirmados: ${recovered} recuperados,  ${critical} em estado crítico e ${deaths}(+${todayDeaths}) mortes. ${affectedCountries} países infectados monkaS`)

  
      
    })
    
  } else {
    
    reqx.end(function (res){
      
  let state = res.body.state
  let country = res.body.country
  let cases = res.body.cases.toLocaleString().replace(/,/g, ' ') 
  let recovered = res.body.recovered.toLocaleString().replace(/,/g, ' ') 
  let todayCases = res.body.todayCases.toLocaleString().replace(/,/g, ' ') 
  let critical = res.body.critical.toLocaleString().replace(/,/g, ' ') 
  let todayDeaths = res.body.todayDeaths.toLocaleString().replace(/,/g, ' ') 
  let deaths = res.body.deaths.toLocaleString().replace(/,/g, ' ')  
  let emoji = flag(country) 
      
  if (country === undefined){ return obote.say(channel, "Local inválido :/") } 
      
      else {
      obote.say(channel, ` ${user.username}, ${emoji} está com ${cases}(+${todayCases}) casos confirmados: ${recovered} recuperados,  ${critical} em estado crítico e ${deaths}(+${todayDeaths}) mortes monkaS`)
      }
  
  
    })
    
    
    
  }
}



module.exports.config = {
	name: "corona",
	aliases: ['covid'],
	description: "Status do covid-19 em paises",
    usage: 'corona [channel]'
}