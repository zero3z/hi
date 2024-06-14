const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['user', 'uinfo'],
    description: '**Thông Tin Người Dùng**',
    execute(message, args) {
        // Check if a user was mentioned in the command, or use the message author as the default user
        const user = message.mentions.users.first() || message.author;

        // Create an embed object
        const embed = new EmbedBuilder()
        .setColor('#FFFFFF')
        .setAuthor({
        name: 'Thông tin người dùng!',
        iconURL: 'https://cdn.discordapp.com/attachments/1140841446228897932/1144684108174348318/giphy_1.gif', 
        url: 'https://discord.gg/muffinie'
    })
        .setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(`**Tên Tài Khoản**:  ${user.username}\n**Tham gia discord vào**:  ${user.discriminator}\n**ID**:  ${user.id}\n**Joined Discord**:  ${user.createdAt.toUTCString()}`)
        .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};