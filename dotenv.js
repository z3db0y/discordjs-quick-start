const fs = require('fs');
if(fs.existsSync('.env') && fs.statSync('.env').isFile()) {
    fs.readFileSync('.env').toString().split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if(value.startswith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if(value.startswith("'") && value.endsWith("'")) value = value.slice(1, -1);
        if(value.startswith('`') && value.endsWith('`')) value = value.slice(1, -1);
        if(key && value) process.env[key] = value;
    });
}