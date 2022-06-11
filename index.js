require('./color');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [ 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING', 'GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_SCHEDULED_EVENTS', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS' ] });
const config = require('./config.json');
const fs = require('fs');
const fetch = require('node-fetch');
const { writeGuildConfig, readGuildConfig } = require('./config.js');
const Command = require('./command');
const oconsole = Object.assign({}, console);
const token = process.env.TOKEN;

console.log = (...args) => { oconsole.log('['+ 'INFO'.green + ']', ...args); }
console.warn = (...args) => { oconsole.log('['+ 'WARN'.yellow + ']', ...args); }
console.error = (...args) => { oconsole.log('['+ 'ERROR'.red + ']', ...args); }
console.debug = (...args) => { oconsole.log('['+ 'DEBUG'.magenta + ']', ...args); }

// When command was last run (for cooldowns).
let lastRun = {};
// Commands
let commands = [];

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag.cyan);
    client.guilds.cache.forEach(guild => {
        if(!readGuildConfig(guild.id)) writeGuildConfig(guild.id, config);
    });
    initiator();
});

function initiator() {
    console.log('Getting app owner...');
    fetch('https://discordapp.com/api/oauth2/applications/@me', {
        headers: {
            'Authorization': 'Bot ' + token
        }
    }).then(res => res.json()).then(json => {
        console.log('App owner: ' + (json.owner.username + '#' + json.owner.discriminator).cyan + ' (' + json.owner.id.green + ')');
        let botOwner = json.owner;

        console.log('Loading commands...');
        fs.readdirSync('./commands').forEach(file => {
            if(!fs.statSync(`commands/${file}`).isFile() || !file.endsWith('.js')) return;
            const command = require(`./commands/${file}`);
            if(!command.prototype || !(command.prototype instanceof Command)) return;
            commands.push(new command());
        });
        client.on('messageCreate', message => {
            const config = readGuildConfig(message.guild.id) || config;
            if(message.content.startsWith(config.prefix)) {
                let args = message.content.split(' ');
                let cmd = args.shift().slice(config.prefix.length).toLowerCase();
                if(!cmd) return;
                let command = commands.find(c => c.name === cmd || c.aliases.includes(cmd));
                if(!command) return;

                if(command.devOnly && botOwner.id !== message.author.id) return;
                if(command.adminOnly && !message.member.hasPermission('ADMINISTRATOR') && message.author.id !== botOwner.id) return message.reply({ embeds: [{
                    title: 'Error!',
                    color: 0xFF0000,
                    description: 'You do not have permission to use this command.'
                }], allowedMentions: { repliedUser: false } });
                
                command.run(message, args);
                console.log('Command ' + command.name.cyan + ' was run by ' + message.author.tag.cyan);
            }
        });
        console.log('Command listener added.');
    });
    
}

client.login(token);