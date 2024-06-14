const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Kiểm tra ping của bot',
    execute(message, args) {
        const ping = message.client.ws.ping;
        const embed = new EmbedBuilder()
            .setColor('#FFB6C1')
            .setTitle('Độ trễ của bot')
            .setDescription(`📊 Ping của bot là${ping}ms.`)
            .setTimestamp();


        message.reply({ embeds: [embed] });
    },
};

