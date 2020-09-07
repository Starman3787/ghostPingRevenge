// MIT License

// Copyright (c) 2020

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
    cachePresences: false,
    messageCacheMaxSize: 5
});

process.on('uncaughtException', () => {
    return console.log("owo");
});

process.on('unhandledRejection', () => {
    return console.log("uwu");
});

client.on('ready', () => {
    client.user.setActivity('for ghostpings', { type: 'WATCHING' }).catch(() => { });
    return console.log("I'm ready to get revenge on those stinky ghostpingers!");
});

client.on('debug', info => {
    return console.log(info);
});

client.on('messageDelete', message => {
    if (!message.author || message.author.bot) return;
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

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (!oldMessage || !newMessage.author || newMessage.author.bot) return;
    if ((oldMessage.mentions.users.size != 0 && newMessage.mentions.users.size == 0) || (oldMessage.mentions.roles.size != 0 && newMessage.mentions.users.size == 0) || (oldMessage.mentions.everyone && !newMessage.mentions.everyone)) {
        const channels = newMessage.guild.channels.cache.array().filter(channel => {
            return channel.type == 'text' && channel.permissionsFor(newMessage.guild.me).has('SEND_MESSAGES') && channel.permissionsFor(newMessage.guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(newMessage.member).has('VIEW_CHANNEL') && channel.id != newMessage.channel.id;
        });
        const channel = channels[Math.floor(Math.random() * channels.length)];
        if (!channel) return;
        return channel.send(`<@${newMessage.author.id}>`).then(msg => {
            return msg.delete().catch(() => { });
        }).catch(() => { });
    }
});

client.on('guildCreate', async guild => {
    return await guild.channels.fetch(true).catch(() => { });
});

client.login(process.env.TOKEN);