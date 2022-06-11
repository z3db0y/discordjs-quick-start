module.exports = 
class Command{
    constructor(opts) {
        opts = opts || {};

        this.name = opts.name || null;
        this.aliases = opts.aliases || [];
        this.description = opts.description || null;
        this.usage = opts.usage || null;
        this.adminOnly = opts.adminOnly || false;
        this.devOnly = opts.devOnly || false;
        this.nsfwOnly = opts.nsfwOnly || false;
        this.cooldown = opts.cooldown || 0;
        this.guildOnly = opts.guildOnly || false;
        this.dmOnly = opts.dmOnly || false;
        this.category = opts.category || null;

        for(var k in this) {
            Object.freeze(this[k]);
        }
    }
}