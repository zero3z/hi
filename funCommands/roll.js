const db = require("../mongodb");
module.exports = {
  name: 'roll',
  aliases: ['rd', 'roll'],
  description: 'Random',
  execute(message, args) {
    const args = message.content.split(' ');

        let maxNumber = 99999999999999999; // Default max number
        if (args[1]) {
            const parsedNumber = parseInt(args[1]);
            if (!isNaN(parsedNumber) && parsedNumber > 0) {
                maxNumber = parsedNumber;
            }
        }

        const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
        message.channel.send(`You rolled: ${randomNumber}`);
  },
};
