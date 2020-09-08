const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "hug",
    category: "utilites",
    run: async(client, message, args) => {
        const url = 'https://some-random-api.ml/animu/hug';
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;



        const avatar = message.author.displayAvatarURL({ size: 4096, dynamic: true });

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

        const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} hugs ${message.mentions.users.first().username || message.mentions.members.first()}`, avatar)
            .setImage(data.link)

        await message.channel.send(embed)
    }
}