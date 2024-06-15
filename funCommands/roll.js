const db = require("../mongodb");
module.exports = {
  name: 'roll',
  aliases: ['rd', 'roll'],
  description: 'Random',
  execute(message, args) {
     const randomIndex = Math.floor(Math.random() * randomMessages.length);

    
    message.reply(`Số roll là ${randomIndex} `);
  },
};
