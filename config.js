const fs = require('fs');
let lastCached = {};

if(!fs.existsSync('./guilds')) fs.mkdirSync('./guilds');
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

module.exports = { readGuildConfig, writeGuildConfig };