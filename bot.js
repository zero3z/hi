const client = require("./main");
const { Riffy } = require("riffy");
const { EmbedBuilder } = require('discord.js');
const fs = require("fs");
const { Classic } = require("musicard");
const { prefix } = require('./config.json');
const nodes = [
     {
    host: "lavalink.oryzen.xyz",
    port: 80, 
    password: "oryzen.xyz", 
     secure: false
  },
];


client.riffy = new Riffy(client, nodes, {
    send: (payload) => {
        const guild = client.guilds.cache.get(payload.d.guild_id);
        if (guild) guild.shard.send(payload);
    },
    defaultSearchPlatform: "ytmsearch",
    restVersion: "v4" 
});


client.on("ready", () => {
    client.riffy.init(client.user.id);
});


client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();
  
    if (command === "play") {
        const query = args.join(" ");
        const player = client.riffy.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            deaf: true 
        });
  
        const resolve = await client.riffy.resolve({ query: query, requester: message.author });
        const { loadType, tracks, playlistInfo } = resolve;
  
        if (loadType === 'playlist') {
            for (const track of resolve.tracks) {
                track.info.requester = message.author;
                player.queue.add(track);
            }
            const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Được thêm vào hàng đợi',
                iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157218651179597884/1213-verified.gif?ex=6517cf5a&is=65167dda&hm=cf7bc8fb4414cb412587ade0af285b77569d2568214d6baab8702ddeb6c38ad5&', 
                url: 'https://discord.gg/muffinie'
            })
                .setDescription(`**Tên danh sách phát: **${playlistInfo.name} \n**Tracks : **${tracks.length}`)
                .setColor('#FFB6C1')
                .setFooter({ text: 'Sử dụng lệnh xếp hàng để biết thêm thông tin' });
            message.reply({ embeds: [embed] });
            if (!player.playing && !player.paused) return player.play();
  
        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks.shift();
            track.info.requester = message.author;
            player.queue.add(track);

            const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Được thêm vào hàng đợi',
                iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157218651179597884/1213-verified.gif?ex=6517cf5a&is=65167dda&hm=cf7bc8fb4414cb412587ade0af285b77569d2568214d6baab8702ddeb6c38ad5&', 
                url: 'https://discord.gg/muffinie'
            })
                .setDescription(`**${track.info.title} **đã được xếp hàng và sẵn sàng phát!`)
                .setColor('#FFB6C1')
                .setFooter({ text: 'Sử dụng lệnh xếp hàng để biết thêm thông tin' });
            message.reply({ embeds: [embed] });

            if (!player.playing && !player.paused) return player.play();
        } else {
            return message.channel.send('Không có kết quả được tìm thấy.');
        }
    } else if (command === "loop") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        const loopOption = args[0];
        if (!loopOption) return message.channel.send("Vui lòng cung cấp tùy chọn vòng lặp:  **queue**, **track**, or **none**.");
    
        if (loopOption === "queue" || loopOption === "track" || loopOption === "none") {
            player.setLoop(loopOption);
            message.channel.send(`Vòng lặp được đặt thành: ${loopOption}`);
        } else {
            message.channel.send("Tùy chọn vòng lặp không hợp lệ. Xin vui lòng chọn `queue`, `track`, or `none`.");
        }
    } else if (command === "pause") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.pause(true);
        const embed = new EmbedBuilder()
        .setAuthor({
          name: 'Phát lại bị tạm dừng!',
          iconURL: 'https://cdn.discordapp.com/attachments/1175488636033175602/1175488720519049337/pause.png?ex=656b6a2e&is=6558f52e&hm=6695d8141e37330b5426f146ec6705243f497f95f08916a40c1db582c6e07d7e&',
          url: 'https://discord.gg/muffinie'
        })
        .setDescription('**Dừng âm nhạc!**')
        .setColor('#FFB6C1');

        message.reply({ embeds: [embed] });
    } else if (command === "resume") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.pause(false);

        const embed = new EmbedBuilder()
        .setAuthor({
          name: 'Đã tiếp tục phát lại!',
          iconURL: 'https://cdn.discordapp.com/attachments/1175488636033175602/1175488720762310757/play.png?ex=656b6a2e&is=6558f52e&hm=ae4f01060fe8ae93f062d6574ef064ca0f6b4cf40b172f1bd54d8d405809c7df&',
          url: 'https://discord.gg/muffinie'
        })
        .setDescription('**Hoạt động trở lại!**')
        .setColor('#FFB6C1');
        message.reply({ embeds: [embed] });

    } else if (command === "seek") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        const position = parseInt(args[0]);
        if (isNaN(position)) return message.channel.send("**Invalid position. Please provide a valid number of milliseconds.**");
    
        player.seek(position);
    } else if (command === "remove") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");

        const index = parseInt(args[0]);
        if (isNaN(index) || index < 1 || index > player.queue.size) {
            return message.channel.send(`Chỉ mục không hợp lệ. Vui lòng cung cấp số hợp lệ từ 1 đến${player.queue.size}.`);
        }

        const removedTrack = player.queue.remove(index - 1);

        if (!removedTrack) return message.channel.send("Không tìm thấy bản nhạc nào tại chỉ mục được chỉ định.");
        const embed = new EmbedBuilder()
        .setColor('#188dcc')
            .setAuthor({
                 name: 'Đã xóa thành công!',
                 iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1236794583732457473/7828-verify-ak.gif?ex=6641dff7&is=66408e77&hm=e4d3f67ff76adbb3b7ee32fa57a24b7ae4c5acfe9380598e2f7e1a6c8ab6244c&',
                 url: 'https://discord.gg/muffinie'
               })
            .setDescription(`**Bài hát đã bị xóa:** ${removedTrack.info.title}`);  
            message.reply({ embeds: [embed] });

    } else if (command === "queue") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player || player.queue.size === 0) return message.channel.send("The queue is currently empty.");
    
        const queueList = player.queue.map((track, index) => `${index + 1}. ${track.info.title}`).join("\n");
        const chunks = queueList.match(/(.|\n){1,1999}/g);

        chunks.forEach(chunk => {
            const embed = new EmbedBuilder()
            .setColor('#FFB6C1')
            .setAuthor({
                 name: 'Queue',
                 iconURL: 'https://cdn.discordapp.com/attachments/1175488636033175602/1175488721001398333/queue.png?ex=656b6a2e&is=6558f52e&hm=7573613cbb8dcac83ba5d5fc55ca607cf535dd117b4492b1c918d619aa6fd7ad&',
                 url: 'https://discord.gg/muffinie'
               })
            .setDescription(chunk);  
            message.channel.send({ embeds: [embed] });
        });
    } else if (command === "skip") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.stop();

        const embed = new EmbedBuilder()
           .setColor('#2b71ec')
        .setAuthor({
          name: 'Bỏ qua bài hát!',
          iconURL: 'https://cdn.discordapp.com/attachments/1175488636033175602/1175488721253052426/right-chevron-.png?ex=656b6a2e&is=6558f52e&hm=7a73aa51cb35f25eba52055c7b4a1b56bbf3a6d150643adc15b52dc533236956&',
          url: 'https://discord.gg/muffinie'
        })
          .setDescription('**Chuyển sang bài hát tiếp theo...**');
        
        message.reply({ embeds: [embed] });
    } else if (command === "shuffle") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");

        player.queue.shuffle();
        const embed = new EmbedBuilder()
        .setColor('#FFB6C1')
        .setAuthor({
          name: 'Hàng đợi bị xáo trộn!',
          iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1236794583732457473/7828-verify-ak.gif?ex=6641dff7&is=66408e77&hm=e4d3f67ff76adbb3b7ee32fa57a24b7ae4c5acfe9380598e2f7e1a6c8ab6244c&',
          url: 'https://discord.gg/muffinie'
        })
          .setDescription('**Xáo trộn các bài hát một cách ngẫu nhiên!**');

        message.reply({ embeds: [embed] });
    } else if (command === "stop") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("No player available.");
    
        player.disconnect();

        const embed = new EmbedBuilder()
        .setColor('#FFB6C1')
        .setAuthor({
          name: 'Người dùng đã dừng lại!',
          iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=6641e8a8&is=66409728&hm=149efc9db2a92eb90c70f0a6fb15618a5b912b528f6b1dcf1b517c77a72a733a&',
          url: 'https://discord.gg/muffinie'
        })
          .setDescription('**Làm cho âm nhạc dừng lại...**');
        message.reply({ embeds: [embed] });
    } else if (command === "clear") {
        const player = client.riffy.players.get(message.guild.id); 
        if (!player) return message.channel.send("Không có người chơi có sẵn.");
        
        player.queue.clear();

        const embed = new EmbedBuilder()
        .setColor('#FFB6C1')
        .setAuthor({
          name: 'Đã xóa hàng đợi!',
          iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1236802032938127470/4104-verify-yellow.gif?ex=6641e6e7&is=66409567&hm=25ecf140bc9c1f9492e9b7a0b573457fd498d744c28d56c5df663d7f84302083&',
          url: 'https://discord.gg/muffinie'
        })
          .setDescription('**Bắt đầu lại từ đầu, xóa hàng đợi ..**');
        message.reply({ embeds: [embed] });
    }
});


client.riffy.on("nodeConnect", node => {
    console.log(`Node "${node.name}" connected.`)
});


client.riffy.on("nodeError", (node, error) => {
    console.log(`Node "${node.name}" encountered an error: ${error.message}.`)
});

client.riffy.on("trackStart", async (player, track) => {
    const musicard = await Classic({
        thumbnailImage: track.info.thumbnail,
        backgroundColor: "#FFB6C1",
        backgroundImage: "https://cdn.discordapp.com/attachments/1220001571228880917/1220001571690123284/01.png?ex=660d5a01&is=65fae501&hm=a8cfb44844e61aa0fd01767cd363af048df28966c30d7b04a59f27fa45cf69c4&",
        nameColor: "#FFB6C1",
        progressColor: "#FFB6C1",
        progressBarColor: "#FFB6C1",
        progress: 50,
        name: track.info.title,
        author: `By ${track.info.author}`,
        authorColor: "#FFB6C1",
        startTime: "0:00",
        endTime: "4:00",
        timeColor: "#FFB6C1"
    });

    fs.writeFileSync("musicard.png", musicard);
    const details = `**Tên Bài Hát:** ${track.info.title}\n` +
    `**Tác Giả** ${track.info.author}\n` +
    `**Có thể tìm kiếm:** ${track.info.seekable}\n` +
    `**Stream:** ${track.info.stream}\n` +
    `**Người yêu cầu:** ${track.info.requester}\n` +
    `**Tên nguồn:** ${track.info.sourceName}`;

    const musicEmbed = new EmbedBuilder()
        .setColor("#FFB6C1")

        .setAuthor({
            name: 'Hiện đang phát một Bản nhạc',
            iconURL: 'https://cdn.discordapp.com/attachments/1140841446228897932/1144671132948103208/giphy.gif', 
            url: 'https://discord.gg/muffinie'
          })
        .setDescription(details)
        .setImage("attachment://musicard.png");

    const channel = client.channels.cache.get(player.textChannel);
    channel.send({ embeds: [musicEmbed], files: ["musicard.png"] });
});


client.riffy.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    const autoplay = false;
    if (autoplay) {
        player.autoplay(player)
    } else {
        player.destroy();
        const embed = new EmbedBuilder()
        .setColor('#FFB6C1')
        .setAuthor({
          name: 'Queue Ended!',
          iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=6641e8a8&is=66409728&hm=149efc9db2a92eb90c70f0a6fb15618a5b912b528f6b1dcf1b517c77a72a733a&',
          url: 'https://discord.gg/muffinie'
        })
          .setDescription('**Bye Bye!, Không còn bài hát nào để chơi...**');
          channel.send({ embeds: [embed] });
      
    }
});


client.on("raw", (d) => {
    client.riffy.updateVoiceState(d);
});
