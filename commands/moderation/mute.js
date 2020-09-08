module.exports = {
    name: "mute",
    category: "moderation",
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return;
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
        if (member.hasPermission(['ADMINISTRATOR']) && !message.member.hasPermission('ADMINISTRATOR')) return;

        let mutedRole = message.guild.roles.cache.get("752894665660825690");
        let verifiedRole = message.guild.roles.cache.get('752895126358982727');
        if (mutedRole) {
            member.roles.add(mutedRole);
            member.roles.remove(verifiedRole);
            message.channel.send("User was Successfully muted.");
        }
    }
}