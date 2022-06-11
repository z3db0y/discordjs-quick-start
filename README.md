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

Note: cooldowns don't work yet, will add if see necessary.
Store TOKEN as env variable.
