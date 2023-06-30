const Database = require('../database');

const database = new Database();

const save = async (asset) => {
    const pool = await database.getPool();

    const result = await pool.query("insert into assets set ?", asset);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from assets where id = ?", [id]);

    return result[0];
}

module.exports = {
    save,
    getById,
}