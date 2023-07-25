const Database = require('../database');

const database = new Database();

const save = async (stage) => {
    const pool = await database.getPool();
    stage.page_id = parseInt(stage.page_id);

    const result = await pool.query("insert into stage set ?", stage);

    return result[0];
}

const update = async (stage) => {
    const pool = await database.getPool();
    stage.page_id = parseInt(stage.page_id);
    stage.id = parseInt(stage.id);

    const result = await pool.query("update stage set ? where id = ?", [stage, stage.id]);

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
    update,
    getById,
    getStagesByPageId
}