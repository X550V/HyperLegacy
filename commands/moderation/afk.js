const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'afk',
    aliases: ['af', 'fk'],
    description: 'Displays Afk ',
    category: 'Moderator',
    usage: '?afk',
    run: async(client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.guild) return message.reply('Kasih Alasan AFK');
        const afk = args.join(' ');
        const embed = new MessageEmbed()
            .setTitle('***AFK!***')
            .setColor('RANDOM')
            .addField('***Name: ***', `${message.author.tag}`)
            .addField('***Reason: ***', afk)
            .setFooter(`Published By ${message.author.tag}`, message.author.displayAvatarURL);

        message.author.send(`You are AFK, with reason: ${afk}`).then(msg => msg.delete(5000));
        message.channel.send(embed);
    }
}