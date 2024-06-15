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
                message.channel.send(`Số random của bạn là: **${number}**`);
            } else {
                message.channel.send('Vui lòng cung cấp số cần random');
            }
        } else {
            message.channel.send('Sử dụng broll + số random');
    }
  },
};
