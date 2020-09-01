require('dotenv').config({ path: `${process.cwd()}/config.env` });
const { Client, Intents } = require('discord.js-light');
const intents = new Intents();
intents.add('GUILDS', 'GUILD_MESSAGES');
const client = new Client({
    ws: {
        intents
    },
    cacheGuilds: true,
    cacheChannels: true,
    cacheOverwrites: true,
    cacheRoles: true,
    cacheEmojis: false,
    cachePresences: false
});

client.on('ready', () => {
    client.user.setActivity('for ghostpings', { type: 'WATCHING' }).catch(() => { });
    return console.log("I'm ready to get revenge on those stinky ghostpingers!");
});

client.on('debug', info => {
    return console.log(info);
});

client.on('messageDelete', message => {
    if (message.author.bot) return;
    if (message.mentions.users.size != 0 || message.mentions.roles.size != 0 || message.mentions.everyone) {
        const channels = message.guild.channels.cache.array().filter(channel => {
            return channel.type == 'text' && channel.permissionsFor(message.guild.me).has('SEND_MESSAGES') && channel.permissionsFor(message.guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(message.member).has('VIEW_CHANNEL') && channel.id != message.channel.id;
        });
        const channel = channels[Math.floor(Math.random() * channels.length)];
        if (!channel) return;
        return channel.send(`<@${message.author.id}>`).then(msg => {
            return msg.delete().catch(() => { });
        }).catch(() => { });
    }
});

client.on('guildCreate', async guild => {
    return await guild.channels.fetch(true);
});

client.login(process.env.TOKEN);