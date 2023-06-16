// get the client
const mysql = require('mysql2/promise');

module.exports = class Database {
    constructor(options = {}) {
        this.options = options;
        this.pool = null;
    }

    async getPool() {
        this.pool = await mysql.createPool({
            host: this.options.host || process.env.DATABASE_HOST ||'localhost', // 'localhost'
            user: this.options.user || process.env.DATABASE_USER || 'root', // 'root',
            database: this.options.database || process.env.DATABASE_DATABASE || 'backend',
            password: this.options.password || process.env.DATABASE_PASSWORD || '123456',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
        return this.pool;
    }
}