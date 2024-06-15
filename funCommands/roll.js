const db = require("../mongodb");
module.exports = {
  name: 'roll',
  aliases: ['rd', 'roll'],
  description: 'Random',
  execute(message, args) {
    const randomMessages = [
      "Số random là :",
];
    const randomIndex = Math.floor(Math.random() * 9999999999999) +1;
     
    
    message.reply(`${randomMessages} ${randomIndex} `);
  },
};
