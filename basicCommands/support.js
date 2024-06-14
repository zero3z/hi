const { EmbedBuilder } = require('discord.js');
const db = require("../mongodb");
module.exports = {
    name: 'support',
    description: 'Máy Chủ Hỗ Trợ Của Bot ',
    execute(message, args) {
        const supportServerLink = "https://discord.gg/muffinie";
      // const githubLink = "https://github.com/GlaceYT";
      // const replitLink = "https://replit.com/@GlaceYT";
      // const youtubeLink = "https://www.youtube.com/@GlaceYT";
        const embed = new EmbedBuilder()
            .setColor('#b300ff')
            .setAuthor({
              name: 'Support Server',
              iconURL: 'https://media.discordapp.net/attachments/1236580619283075103/1250472579177644043/IMG_2599.jpg?ex=666d0b17&is=666bb997&hm=ed217188fd6f1b4aac8a6da5bc7f6985ef5d1c1b2f35ea1231640e5ae0eadcc8&=&format=webp&width=525&height=525', 
              url: 'https://discord.gg/muffinie'
          })
            .setDescription(`<a:xoay:1246803022655393802> **Tham gia máy chủ Discord của chúng tôi để được hỗ trợ và cập nhật:**\n- Discord - ${supportServerLink}`)
            .setImage('https://media.discordapp.net/attachments/1236580619283075103/1250472579177644043/IMG_2599.jpg?ex=666d0b17&is=666bb997&hm=ed217188fd6f1b4aac8a6da5bc7f6985ef5d1c1b2f35ea1231640e5ae0eadcc8&=&format=webp&width=525&height=525')
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};


/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/
