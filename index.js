const discord = require('discord.js');
const fetch = require('node-fetch');
const client = new discord.Client();
//the client to work with for the server


const getQuote = () => {
  //async fetch call to get the api 
  //once it gets the api it will convert data into json format
  //once converted it will format the data to "quote" - author
  return fetch('https://zenquotes.io/api/random')
  .then(res => {
    return res.json();
  })
  .then(data => {
    return data[0]['q']+' -' + data[0][''];
  })
}


//ready event means the bot has connected to the server and is ready to do more things 
client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`);
});

//going to listen for a message now
client.on('message', (msg) => {

  //check to see if the message is from the bot
  if(msg.author.bot) return; //dont want anything from the bot

  if(msg.content === '$inspire'){
    //if the message says inspire call the getQuote function
    getQuote().then(
      quote => {
        msg.channel.send(quote);
      }
    )
  }


  //check to see what the message is
  if(msg.content === 'ping'){
    msg.reply('pong');
    //thew bot will reply with another message when listening for the that specific message
  }
});

//use bot token from .env to login to server 
client.login(process.env.TOKEN);