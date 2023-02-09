const con = require('../clients/mysql.js').connection

 con.on('error', function(err) {console.log(err)});

 const getChannels = () => new Promise((resolve, reject) => {
    con.query('SELECT * FROM obote_channels', (err, results, fields) => {
        if (err) {
          throw err
        } else {
            resolve(results);
        }
    });
});

let channelList = [];
let channelOptions = [];
async function res() {
  channelList.push(await getChannels());
  await channelList[0].forEach(i => channelOptions.push(i.channel))
}

res()

function sleepGlob(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

sleepGlob(1500);


module.exports = { channelOptions }

  

  
