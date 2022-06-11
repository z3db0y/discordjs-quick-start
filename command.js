module.exports = 
class Command{
    constructor(name, description, usage, aliases, adminOnly = 0, nsfwOnly = 0, devOnly = 0, cooldown = 0) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.aliases = aliases;
        this.adminOnly = adminOnly;
        this.nsfwOnly = nsfwOnly;
        this.devOnly = devOnly;
        this.cooldown = cooldown;

        for(var k in this) {
            Object.freeze(this[k]);
        }
    }
}