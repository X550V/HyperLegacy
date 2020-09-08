const { Client, MessageEmbed, Collection } = require('discord.js');
const discord = require('discord.js');
const { config } = require('dotenv');
const prefix = "hl!";
const usersMap = new Map();
const LIMIT = 5;
const TIME = 7000;
const DIFF = 3000;
const { GiveawaysManager } = require("discord-giveaways");

const client = new Client({
    disableEveryone: true
})

client.commands = new Collection();
client.aliases = new Collection();
client.config1 = config;

config({
    path: __dirname + "/.env"
});

["commands.js"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Bot Ready Up \n1 \n2 \n3 \nReady To Duty ${client.user.username} !`);

    let statuses = [
        `hl!help |🌏 Berada ${client.guilds.cache.size} Server`,
        `hl!help |👥 Dengan ${client.users.cache.size} Users`,
        `hl!help |📞 Online ${client.channels.cache.size} Channels`,
        `hl!help |💻 Developer By TheBlueRose`
    ];

    setInterval(function() {

        let status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setPresence({ activity: { name: status }, status: 'dnd', type: 'WATCHING' });
    }, 1000);

    client.on("message", message => {
        let wordArray = message.content.split(" ");
        console.log(wordArray)

        let filterWords = [
            "Fuck",
            "Shit",
            "Asshole",
            "Stupid",
            "Bastard",
            "Damn",
            "Goblog",
            "Tolol",
            "Kontol",
            "Asu",
            "Pepek",
            "Anjng",
            "Anjay",
            "Memek",
            "Kenthu",
            "Jembot",
            "Memek",
            "Bodoh",
            "fuck",
            "shit",
            "asshole",
            "stupid",
            "bastard",
            "damn",
            "goblog",
            "tolol",
            "kontol",
            "asu",
            "pepek",
            "anjng",
            "anjay",
            "memek",
            "kenthu",
            "jembot",
            "memek",
            "bodoh"
        ];
        for (var i = 0; i < filterWords.length; i++) {
            if (wordArray.includes(filterWords[i])) {
                message.delete();
                message.reply(
                    'This Word Not Allowed So Becarefull'
                );
                break;
            }
        }

    })
    const manager = new GiveawaysManager(client, {
        storage: "./giveaways.json",
        updateCountdownEvery: 10000,
        default: {
            botsCanWin: false,
            exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
            embedColor: "#FF0000",
            reaction: "🎉"
        }
    });
    client.giveawaysManager = manager;

    let stats = {
        serverID: '719370673566253160',
        total: "752708904378564709",
        member: "752708961198669855",
        bots: "752709054643699782"
    }



    client.on('guildMemberAdd', member => {
        if (member.guild.id !== stats.serverID) return;
        client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
        client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
        client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
    })

    client.on('guildMemberRemove', member => {
        if (member.guild.id !== stats.serverID) return;
        client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
        client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
        client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);


    })
    client.on('message', message => {
        if (message.author.bot) return;
        if (usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
            console.log(difference);
            if (difference > DIFF) {
                clearTimeout(timer);
                console.log('Cleared timeout');
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                    console.log('Removed from RESET.');
                }, TIME);
                usersMap.set(message.author.id, userData);
            } else {
                ++msgCount;
                if (parseInt(msgCount) === LIMIT) {
                    const role = message.guild.roles.cache.get('719375912809922611');
                    message.member.roles.add(role);
                    message.channel.send('You have been muted.');
                    setTimeout(() => {
                        message.member.roles.remove(role);
                        message.channel.send('You have been unmuted');
                    }, TIME);
                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }
        } else {
            let fn = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.');
            }, TIME);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn
            });
        }
    });

    client.on("message", async message => {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);



        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        if (command)
            command.run(client, message, args);


    });
})

client.login(process.env.token);