const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    cateogry: "utilites",
    run: async(client, message, args) => {
        if (message.deletable) message.delete();

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const avatar = message.author.displayAvatarURL({ size: 4096, dynamic: true });
        const embed = new MessageEmbed()
            .setTitle('__**♨ Command\'s ♨**__')
            .setThumbnail('https://media.discordapp.net/attachments/718793933118767154/749273746979946556/Animated_GIF-downsized_large_12.gif')
            .setAuthor(`${message.guild.name}`, avatar)
            .addFields({ name: '__**📝 My Bot Prefix**__!', value: '__**💠 hl!**__!' }, { name: '==================================', value: '\u200B' }, { name: '\_\_\*\*\*🔑Admin!\*\*\*\_\_\_', value: '**- Afk**\n **- Mute**\n **- Unmute**\n **- Ban**\n **- Unban**\n **- Kick** \n **- Giveaway** \n **- Report**\n **- Reroll**\n **- Warning**\n', inline: true }, { name: '\_\_\*\*\*🔨Utilities!\*\*\*\_\_\_', value: '**- Avatar**\n **- Covid**\n **- Ping**\n **- Help**\n **- Meme**\n **- Hug**\n **- Say**\n **- Afk**\n **- Intro**\n **- Weather**', inline: true }, { name: '\_\_\*\*\*🧾Inform!\*\*\*\_\_\_', value: '**- BotInfo**\n **- UserInfo**\n **- ServerInfo**', inline: true })
            .setFooter(`Requested by ${message.author.username}`, avatar)
            .setColor('BLACK')
            .setImage("https://images-ext-2.discordapp.net/external/COl0mZHjPwdVXFoxenrUPy1jbX8atqOai7dIO42wMns/https/media.discordapp.net/attachments/709369821439197237/709374347340677231/lineee.gif")
            .setTimestamp()
        return message.channel.send(embed);

    }
}