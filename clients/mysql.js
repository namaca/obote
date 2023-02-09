// get the client
const obote = require('./obote.js')
const config = require('../credentials/config.js')
const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'twitch',
  password: config.PASSWORD_MYSQL
});

connection.on('error', function(err) {
	console.log(err)
	connection.query(`INSERT INTO error_logs (error_message) VALUES ('${JSON.stringify(err)}')`, function(err, result) {
		if(err){
			console.log('Erro logado em twitch.error_logs')
		}
		
	})
});

connection.connect(function(err) {
	if (err) {
		obote.say('namaca', 'namaca, erro na database monkaS')
		console.log(err)
	} else {
		console.log("Database connectada!");
	}
});

setInterval(async() => {
	connection.query(`UPDATE user_alias SET color="Cinza" WHERE color='null';`, function(err,result) {
      if(err) throw err
	})
}, 1800000);




module.exports = { connection } 