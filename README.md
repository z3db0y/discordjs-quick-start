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
        super('name', 'description' 'usage', [ 'aliases' ], isAdminOnly, isNSFWOnly, isDevOnly, cooldown);
    }
    
    run(ctx, args) {
        ctx.reply('Hi');
    }
}
```

Note: cooldowns don't work yet, will add if see necessary.
Store TOKEN as env variable.
