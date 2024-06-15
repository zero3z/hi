const db = require("../mongodb");
module.exports = {
  name: 'roll',
  aliases: ['rd', 'roll'],
  description: 'Random',
  execute(message, args) { 
    const random = parseInt(args[0])
    let rd = Math.floor(Math.random() * random) + 1;
    message.channel.send('**Con số random là:** __**${rd}**__ `);
  },
};
