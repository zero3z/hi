const { EmbedBuilder } = require('discord.js');
const {
    MessageEmbed,
    Permissions
  } = require(`discord.js`)
  
module.exports = {
    name: 'ban',
    description: 'Cấm Người Dùng Khỏi Máy Chủ',
    execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('Bạn không có quyền sử dụng lệnh này');
        }
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Bạn cần đề cập một người dùng');
        }
        const member = message.guild.members.cache.get(user.id);
        member.ban();
        const embed = new EmbedBuilder()
            .setColor('#FFB6C1')
            .setTitle('Người dùng đã bị cấm')
            .setDescription(`▶️ ${user.tag} has been banned from the server by ${message.author.tag}.`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};


/*

   MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   FOR EMOJIS EITHER YOU CAN EDIT OR JOIN OUR DISCORD SERVER 
   SO WE ADD BOT TO OUR SERVER SO YOU GET ANIMATED EMOJIS.

   DISCORD SERVER : https://discord.gg/FUEHs7RCqz
   YOUTUBE : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A

   FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/c4kaW2sSbm ]
*/
