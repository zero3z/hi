const db = require("../mongodb");
module.exports = {
  name: 'roll',
  aliases: ['rd', 'roll'],
  description: 'Random',
  execute(message, args) { 
    const number = Math.floor(Math.random() * 100) + 1;
    message.channel.send(`Số random là: ${number}`);
  },
};
