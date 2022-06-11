const Command = require('./command');
const fs = require('fs');
let lastCached = {};
let lastCachedUsers = {};

if(!fs.existsSync('./guilds')) fs.mkdirSync('./guilds');
if(!fs.existsSync('./users')) fs.mkdirSync('./users');
function readGuildConfig(guildId) {
    if(fs.existsSync(`./guilds/${guildId}.json`)) {
        if(!lastCached[guildId] || lastCached[guildId].time > fs.statSync(`./guilds/${guildId}.json`).mtimeMs) {
            lastCached[guildId] = {
                time: Date.now(),
                config: JSON.parse(fs.readFileSync(`./guilds/${guildId}.json`))
            }
        }
    } else {
        lastCached[guildId] = {
            time: Date.now(),
            config: null
        }
    }
    return lastCached[guildId].config;
}

function writeGuildConfig(guildId, config) {
    if(readGuildConfig(guildId) !== config) {
        fs.writeFileSync(`./guilds/${guildId}.json`, JSON.stringify(config, null, 2));
        lastCached[guildId] = {
            time: Date.now(),
            config
        };
    }
}

function readUserData(userId) {
    if(fs.existsSync(`./users/${userId}.json`)) {
        if(!lastCachedUsers[userId] || lastCachedUsers[userId].time > fs.statSync(`./users/${userId}.json`).mtimeMs) {
            lastCachedUsers[userId] = {
                time: Date.now(),
                data: JSON.parse(fs.readFileSync(`./users/${userId}.json`))
            }
        }
    } else {
        lastCachedUsers[userId] = {
            time: Date.now(),
            data: null
        }
    }
    return lastCachedUsers[userId].data;
}

function writeUserData(userId, data) {
    if(readUserData(userId) !== data) {
        fs.writeFileSync(`./users/${userId}.json`, JSON.stringify(data, null, 2));
        lastCachedUsers[userId] = {
            time: Date.now(),
            data
        };
    }
}

function getCommands() {
    return fs.readdirSync('./commands').filter(file => file.endsWith('.js') && fs.statSync(`./commands/${file}`).isFile()).map(file => {
        let command = new (require(`./commands/${file}`))();
        if(command instanceof Command) {
            return command;
        }
        return null;
    }).map(x => x);
}

module.exports = { readGuildConfig, writeGuildConfig, readUserData, writeUserData, getCommands };