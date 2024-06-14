const db = require("../mongodb");
module.exports = {
  name: 'say',
  description: 'Làm cho bot lặp lại một tin nhắn và xóa tin nhắn của người dùng',
  async execute(message, args) {
   
    if (args.length === 0) {
      message.reply('Vui lòng cung cấp tin nhắn để lặp lại.');
      return;
    }

  
    const messageToRepeat = args.join(' ');

    
    try {
      await message.delete();
    } catch (error) {
      console.error(`Lỗi xóa tin nhắn của người dùng: ${error}`);
    }

 
    message.channel.send(messageToRepeat);
  },
};
