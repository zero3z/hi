const db = require("../mongodb");
module.exports = {
  name: 'roll',
  aliases: ['rd', 'roll'],
  description: 'Random',
  execute(message, args) { 
    if (args.length === 1) {
            const max = parseInt(args[0]);

            if (!isNaN(max) && max > 0) {
                const number = Math.floor(Math.random() * max) + 1;
                message.channel.send(`Your random number between 1 and ${max} is: ${number}`);
            } else {
                message.channel.send('Please provide a valid positive number.');
            }
        } else {
            message.channel.send('Usage: !random <max>');
  },
};
