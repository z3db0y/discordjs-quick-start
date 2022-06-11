const fs = require('fs');
if(fs.existsSync('.env') && fs.statSync('.env').isFile()) {
    fs.readFileSync('.env').toString().split('\n').forEach(line => {
        const [key, value] = line.split('=').map(x => x.trim());
        if(key && value) {
            if(value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if(value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            if(value.startsWith('`') && value.endsWith('`')) value = value.slice(1, -1);
            process.env[key] = value;
        }
    });
}