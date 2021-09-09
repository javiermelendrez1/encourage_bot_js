const discord = require('discord.js');
const client = new discord.client();
//the client to work with for the server

//ready event means the bot has connected to the server and is ready to do more things 

client.on('ready', () => {
  console.log(`logged in as ${client.uer.tag}`);
});

//going to listen for a message now
client.on('message', (msg) => {
  //check to see what the message is
  if(msg.content === 'ping'){
    msg.reply('pong');
    //thew bot will reply with another message when listening for the that specific message
  }
});