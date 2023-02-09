const db = require('../clients/mysql.js').connection
const mysql = require('mysql2');

const doQueryIn = (query) => new Promise((resolve, reject) => {
    db.query(query, (err, results, fields) => {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
});

exports.formatBytes = (a, b) => {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
} 

exports.parseDur = (ms) => {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} dias, ${hours} horas, ${minutes} minutos`
  } else if (hours) {
    return `${hours} horas, ${minutes} minutos, ${seconds} segundos`
  } else if (minutes) {
    return `${minutes} minutos, ${seconds} segundos`
  }
  
  return `${seconds} segundos`
}

 exports.randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

 
 
exports.formatUptime = (seconds) => {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);
	if (hours === 0 && minutes != 0) {
		return minutes + 'm ' + seconds + "s";
	} else {
		if (minutes === 0 && hours === 0) {
			return seconds + "s"
		} else if (seconds === 5 || hours === 0 && minutes === 0) {
			return 'alguns segundos'
		} else {
			return hours + 'h ' + minutes + 'm ' + seconds + "s";
		}
	}
}

exports.dbQuery = (query) => new Promise((resolve, reject) => {
  db.query(query, (err, results, fields) => {
    if (err) {
      return;
    } else {
      resolve(results);
    }
  });
});

exports.errorLog = async(err) => {
  console.log(err)
  const sql = 'INSERT INTO error_logs (error_message, date) VALUES (?, ?)';
  const insert = [JSON.stringify(err), new Date()];
  await doQueryIn(mysql.format(sql, insert));
}

exports.hasNumber = (myString) => {
  return /\d/.test(myString);
}

