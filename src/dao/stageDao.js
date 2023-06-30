const Database = require('../database');

const database = new Database();

const save = async (stage) => {
    const pool = await database.getPool();
    stage.page_id = parseInt(stage.page_id);

    const result = await pool.query("insert into stage set ?", stage);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from stage where id = ?", [id]);

    return result[0];
}

const getStagesByPageId = async (page_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from stage where page_id = ?", [page_id]);

    return result[0];
}

module.exports = {
    save,
    getById,
    getStagesByPageId
}