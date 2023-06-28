const Database = require('../database');

const database = new Database();

const save = async (chapter) => {
    const pool = await database.getPool();
    chapter.project_id = parseInt(chapter.project_id);

    const result = await pool.query("insert into chapters set ?", chapter);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from chapters where id = ?", [id]);

    return result[0];
}

const getChaptersByProjectId = async (project_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from chapters where project_id = ?", [project_id]);

    return result[0];
}

module.exports = {
    save,
    getById,
    getChaptersByProjectId
}