const fs = require('fs');

module.exports = function getEnv(filePath) {
    const env = fs.readFileSync(filePath, 'utf8');

    env.trim().split('\n').forEach(line => {
        const [key, value] = line.split('=');
        process.env[key] = value.trim();
    });
    return process.env;
};