# Discord.JS Quick Start

How to use:
 - Clone this repo
 - Run `npm install`
 - All done! You can add commands in the commands folder.

## Example command:
```js
const Command = require('../command');
module.exports = class extends Command {
    constructor() {
        super({
            name: 'example',
            description: 'Example command.',
            aliases: [],
            usage: 'example',
            adminOnly: false,
            devOnly: false,
            nsfwOnly: false,
            cooldown: 5000
        });
    }
    
    run(ctx, args) {
        ctx.reply('Hi');
    }
}
```

## You can also get command info:
```js
const commands = require('../utils').getCommands();
console.log(commands[0]);
```

## Or read and write user/guild data:
```js
const { readGuildConfig, writeGuildConfig, readUserData, writeUserData } = require('../utils');

// Read the config for guild with ID 12345678901234567
readGuildConfig('12345678901234567');

// Write the config for guild with ID 12345678901234567
writeGuildConfig('12345678901234567', { prefix: '$' });

// Read data of user with ID 12345678901234567.
readUserData('12345678901234567');

// Write data of user with ID 12345678901234567.
writeUserData('12345678901234567', { linkedAccounts: {} });
```
Note: Store token in TOKEN environment variable or `.env` file. (Syntax: `TOKEN=YOUR_TOKEN`)