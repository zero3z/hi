const db = require("../mongodb");
module.exports = {
  name: 'roll',
  aliases: ['rd', 'roll'],
  description: 'Random',
  execute(message, args) {

        if (!args[0]) args[0] = "10";
    if (args[0] <= 0 || isNaN(args[0])) {
      return client.deleteMsg(message, `${client.e.error} Số không khả dụng`, 5000, "reply")
    }
    const random = parseInt(args[0])
    let rd = Math.floor(Math.random() * random) + 1;
    message.channel.send('**Con số random của ${message.member} là:** __**${rd}**__ `);
  },
};
