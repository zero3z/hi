const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'owner',
    description: 'Chủ Sở Hữu Bot',
    execute(message, args) {
        const DiscordLink = 'https://discord.gg/muffinie';
        const InstagramLink = 'https://www.instagram.com/athuuu.nhie/';
        const embed = new EmbedBuilder()
            .setColor('#FFB6C1')
            .setTitle(' <:sohuu:1246438340060905512> Owner Info')
            .setDescription(`__**Về tôi**__:\n 🤖 Tôi là Bé Bún. Bé Bún Siu Dễ Thương\n <a:nhay:1246437179647856671> [Tunnie](${DiscordLink})\n <a:nhay:1246437179647856671> [Tunnie](${InstagramLink})`)
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