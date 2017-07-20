const lib = require('lib')({token: process.env.STDLIB_TOKEN});
var bodyParser = require('body-parser');
// var snackList = require('../../snack.json');
var db = require('../../db.js');
// var fs = require('fs');
// var json = JSON.stringify(object);

var items =  db.getItemList();
var object = {
	"user":"cat", 
    "snackName":"pokki",
    "restriction":"geese"
}

// var json = JSON.stringify(object);
// snackList.push(json);
// fs.writeFile('../../snack.json', json);


/**
* /snack
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
	update();
  callback(null, {
    response_type: 'in_channel',
    text: `Thanks, <@${user}>...\nYou said ${text} is your favorite snack. We'll update our records.\nIsn't ${json} cool? Do you like ${items[0].snackName}`
  });
};



  function update() {

if (db.items.length > 0) {
  db.items.push(text);
} else {
  let newList = [];
  newList.push(text);
  db.items = newList;
}

db.saveItemList(db.items);
}
// var json = JSON.stringify(object);
// var newSnackList = snackList;
// snackList.push(json);
// var newSnackList =  
// fs.writeFile('../../snack.json', newSnackList);
// };


// function updateList(){
// var userName = user;
// var snackName = text;
// var restrictions = "none";  

// var object = {
// 	"user" : userName,
// 	"snackName" : snackName,
// 	"restrictions" : restrictions
// };

// var json = JSON.stringify(object);
// snackList.user.push(userName);
// fs.writeFile('../../snack.json', json, 'utf8', callback);
// }


