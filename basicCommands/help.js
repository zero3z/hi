const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const db = require("../mongodb");
module.exports = {
  name: 'help',
  aliases: ['hlp', 'h'],
  description: 'Hiển thị danh sách các lệnh có sẵn',
  execute(message, args) {
    const botUser = message.client.user;
    const botPing = Date.now() - message.createdTimestamp;
    const serverCount = message.client.guilds.cache.size;
    const embed = new EmbedBuilder()
      .setColor('#FFB6C1')
      .setAuthor({
        name: 'Các lệnh của bot',
        iconURL: 'https://media.discordapp.net/attachments/1248156331785850901/1250653963716399164/zzz.gif?ex=666d0b44&is=666bb9c4&hm=f221cff8a8ad3a308757569ed90c845fd40683636d94ca7adce86ab0dd8be5f6&=&width=825&height=463', 
        url: 'https://discord.gg/muffinie'
    })
     
      .setDescription(`__**STATS :**__\n\n> **<a:sao:1251120089823051847> Bot trong máy chủ:** ${serverCount}\n> **🟢 Bot Ping:** ${botPing}ms\n> **<:sohuu:1246438340060905512> Code Bởi [MK](https://discord.gg/muffinie)**\n\n__**LỆNH:**__ `)
      .addFields(
      
        {
          name: '<a:xoay:1246803022655393802>  Lệnh Cơ Bản',
          value: '`avatar`, `owner`, `support`, `invite`, `userinfo`',
          inline: true,
        },
       
        {
          name: '<a:music:1246437360749641838>  Music',
          value: '`play`, `stop`, `seek`,`volume`,`pause`,`resume`,`skip`,`remove`,`shuffle`,`queue`',
          inline: true,
        },
      
        {
          name: '<a:xoay:1246803022655393802>  Fun',
          value: ' `ascii`, `joke`, `roll`',
          inline: true,
        },
      
        {
          name: '<a:xoay:1246803022655393802>  Image',
          value: '`cat`, `dog`',
          inline: true,
        },
      
        {
          name: '<a:xoay:1246803022655393802>  Anime',
          value: '`<prefix>animecommands for more info`',
          inline: true,
        },
     
        {
          name: '<a:xoay:1246803022655393802>  Utility',
          value: '`kick`, `ban`, `serverinfo`,`userinfo`, `clear`',
          inline: true,
        }
      )
      .setThumbnail(botUser.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
      .setImage(`https://media.discordapp.net/attachments/1248156331785850901/1250653963716399164/zzz.gif?ex=666d0b44&is=666bb9c4&hm=f221cff8a8ad3a308757569ed90c845fd40683636d94ca7adce86ab0dd8be5f6&=&width=1165&height=655`);

    //const button1 = new ButtonBuilder()
      //.setLabel('YouTube')
      //.setURL('https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A')
      //.setStyle(ButtonStyle.Link);

    const button1 = new ButtonBuilder()
      .setLabel('Discord')
      .setURL('https://discord.gg/muffinie')
      .setStyle(ButtonStyle.Link);

    //const button3 = new ButtonBuilder()
      //.setLabel('Code')
      //.setURL('https://github.com/GlaceYT')
      //.setStyle(ButtonStyle.Link);
      
    const row = new ActionRowBuilder()
      .addComponents(button1);
    
    message.reply({ embeds: [embed], components: [row] });
  },
};
