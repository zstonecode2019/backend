const Database = require('../database');

const database = new Database();

const addLog = async (log) => {
    const pool = await database.getPool();
    log.operator = process.env.USER_ID;

    const result = await pool.query("insert into logs set ?", log);

    return result[0];
}

const getLogs = async (page, size) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from logs order by id desc limit ?, ?", [page * size, size]);

    return result[0];
}

const getLogsCount = async () => {
    const pool = await database.getPool();

    const result = await pool.query("select count(*) as count from logs");

    return result[0][0].count;
}

module.exports = {
    addLog,
    getLogs,
    getLogsCount
}