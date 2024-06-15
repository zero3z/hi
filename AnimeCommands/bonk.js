const { EmbedBuilder } = require('discord.js');
const anime = require('anime-actions');
const db = require("../mongodb");
module.exports = {
  name: 'bonk',
  description: 'Bonk',
  async execute(message, args) {
    const sender = message.author;
    const targetUser = message.mentions.users.first();
    const bonkGif = await anime.bonk();

    const embed = new EmbedBuilder()
      .setColor('#ff3366')
      .setDescription(`${sender} đã đập vào đầu ${targetUser || 'the air'} `)
      .setImage(bonkGif);

    message.reply({ embeds: [embed] });
  },
};
