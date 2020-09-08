const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "userinfo",
    category: "info",
    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "Online";
                break;
            case "dnd":
                status = "Do Not Disturb";
                break;
            case "idle":
                status = "Idle";
                break;
            case "invisible":
                status = "Invisible";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`${user.user.username} Details`)
            .setColor("RANDOM")
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .addFields({
                name: "ID: ",
                value: user.user.id,
            }, {
                name: "Name: ",
                value: user.user.username,
                inline: true
            }, {
                name: "Discriminator: ",
                value: `#${user.user.discriminator}`,
                inline: true
            }, {
                name: "Current Status: ",
                value: status,
            }, {
                name: "Activity: ",
                value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                inline: true
            }, {
                name: 'Avatar link: ',
                value: `[Click Here](${user.user.displayAvatarURL()})`,
            }, {
                name: 'Creation Date: ',
                value: user.user.createdAt.toLocaleDateString("en-us"),
                inline: true
            }, {
                name: 'Joined Date: ',
                value: user.joinedAt.toLocaleDateString("en-us"),
                inline: true
            }, {
                name: 'User Roles: ',
                value: user.roles.cache.map(role => role.toString()).join(" ,"),
                inline: true
            })

        await message.channel.send(embed)
    }
}