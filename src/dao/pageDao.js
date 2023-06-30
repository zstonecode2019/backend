const Database = require('../database');

const database = new Database();

const save = async (page) => {
    const pool = await database.getPool();
    page.chapter_id = parseInt(page.chapter_id);

    const result = await pool.query("insert into pages set ?", page);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from pages where id = ?", [id]);

    return result[0];
}

const getPagesByChapterId = async (chapter_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from pages where chapter_id = ?", [chapter_id]);

    return result[0];
}

module.exports = {
    save,
    getById,
    getPagesByChapterId
}