const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');


const size    = config.colors;
const rainbow = new Array(size);

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
  for (let index = 0; index < servers.length; ++index) {		
    client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(rainbow[place])
		.catch(console.error);
		
    if(config.logging){
      console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${servers[index]}`);
    }
    if(place == (size - 1)){
      place = 0;
    }else{
      place++;
    }
  }
}
client.on('message', msg => {
  if (msg.content === 'göktan') {
    msg.reply('hayir göktan');
  }
});
client.on('message', msg => {
  if (msg.content === 'ece') {
    msg.reply('evet ece');
  }
});
client.on('message', msg => {
  if (msg.content === 'ece göktan') {
    msg.reply('hayır evet');
  }
});
client.on('message', msg => {
  if (msg.content === 'göktan ece') {
    msg.reply('evet hayir');
  }
});
client.on('message', msg => {
  if (msg.content === 'tag') {
    msg.reply('gök');
  }
});
client.on('message', msg => {
  if (msg.content === '!tag') {
    msg.reply('gök');
  }
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  if(config.speed < 1){console.log("100 Üst olömalı"); process.exit(1);}
  setInterval(changeColor, config.speed);
client.user.setStatus('idle')
});


client.login(config.token);
