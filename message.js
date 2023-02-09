const obote = require('./clients/obote.js').client;
const afk = obote.afk;
const db = require('./clients/mysql.js').connection;
const ignore = require('./utils/addons.js').ignored;
const custom = require('./utils/functions.js')
const globalCd = new Set()
const cmdCd  =  new Set()
let prefix;
obote.on("chat", async (channel, user, message, self) => {

	if(self)return

	db.query(`SELECT prefix FROM obote_channels WHERE channel='${channel.replace('#', '')}'`,  async function(err, results) {
     if(err)throw err
     
     prefix = results[0].prefix
     const args = message.slice(prefix.length).trim().split(/ +/g);
     const command = args.shift().toLowerCase();

     let afkcheck = obote.afk.get(user['user-id']);
     const liveStatus = await custom.dbQuery(`
        SELECT *
        FROM obote_channels
        WHERE channel="${channel.replace('#', '')}"
        `);

    if(liveStatus[0].status === 'live' && channel === '#supinic'){
        return;  
    }
     if (afkcheck) return [obote.afk.delete(user['user-id']), obote.say(channel, `${user.username} voltou: ${afkcheck.reason} (${ms(Date.now() - afkcheck.start)})`)]
     
    if(ignore.includes(user['user-id'])){
     return
    }

    if(channel === '#ghiletofar' && message.length < 400 && !message.startsWith(prefix) && !ignore.includes(user['user-id']) && !message.includes('⣿')){
        db.query(`INSERT INTO ghiletofar_logs (USERNAME,TEXT,USER_ID) VALUES ('${user.username}','${message}',${user['user-id']})`, function(err,result){
            if(err){
            	let erro = err
                db.query(`INSERT INTO error_logs (error_message) VALUES('${JSON.stringify(erro)}')`, function(err, result) {

                    console.log('Mensagem nao logada, olhe no error_logs')
                })               
            }
        })
    }
    if(channel === '#lusfica' && message.length < 400 && !message.startsWith(prefix) && !ignore.includes(user['user-id']) && !message.includes('⣿')){
        db.query(`INSERT INTO lusfica_logs (USERNAME,TEXT,USER_ID) VALUES ('${user.username}','${message}',${user['user-id']})`, function(err,result){
            if(err){
              let erro = err
                db.query(`INSERT INTO error_logs (error_message) VALUES('${JSON.stringify(erro)}')`, function(err, result) {

                    console.log('Mensagem nao logada, olhe no error_logs')
                })               
            }
        })
    }
    db.query(`SELECT * FROM user_alias WHERE ID=${user['user-id']}`, function(err, result){
        if(err) throw err;

        if(result[0] === undefined){
            
        db.query(`INSERT INTO user_alias (ID,USERNAME,COLOR,DISPLAY_NAME) VALUES(${user['user-id']},'${user.username}','${user.color}','${user['display-name']}')`, function(err, result) {
            if(err) throw err;           
        })

        } else {

            if(user['display-name'] !== result.DISPLAY_NAME){
               db.query(`UPDATE user_alias SET DISPLAY_NAME = '${user['display-name']}' WHERE ID = ${user['user-id']};`, function(err, result) {
               if(err) throw err; 


              })
            }

            if(user.username !== result.USERNAME){
               db.query(`UPDATE user_alias SET USERNAME = '${user.username}' WHERE ID = ${user['user-id']};`, function(err, result) {
               if(err) throw err;

               
              })
            }

            if(user.color !== result.COLOR){
               db.query(`UPDATE user_alias SET COLOR = '${user.color}' WHERE ID = ${user['user-id']};`, function(err, result) {
               if(err) throw err;

               
              })
            }
        }
    })

    

   if (!message.startsWith(prefix)) return;

   if(globalCd.has('cooldown'))return;
   if(cmdCd.has(user.username))return;
   cmdCd.add(user.username);
   globalCd.add('cooldown');


   let commandfile = obote.commands.get(command) || obote.commands.get(obote.aliases.get(command))

   if(commandfile)  commandfile.run(obote, message, args, user, channel, self, prefix, afk) 

    setTimeout(function()  {
        globalCd.delete('cooldown')
    }, 2000)
    setTimeout(function()  {
        cmdCd.delete(user.username)
    }, 5000)

    })
})
