const discord = require('discord.js');
const fetch = require('node-fetch');
//the client to work with for the server
const client = new discord.Client();
//going to create a array of keywords for the bot to listen for 
const sadWords = ['sad','depressed','unhappy','angry'];
//going to add an array of encouraging messages
const encouragements = ['cheer up', 'hang in there', 'you are a great person/bot'];

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

  //check if the message contains a word in the sad array 
  //going to use the array some method
  //this method checks if on element passes the test in the function
  //true will be returned or false
  if(sadWords.some(word => msg.content.includes(word))){
    //if true get a random encouragement word and reply with it
    const encourage = encouragements[Math.floor(Math.random() * encouragements.length)];
    msg.reply(encourage);
  }
});

//use bot token from .env to login to server 
client.login(process.env.TOKEN);