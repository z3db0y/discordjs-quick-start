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