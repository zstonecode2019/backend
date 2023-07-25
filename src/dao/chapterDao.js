const Database = require('../database');

const database = new Database();

const save = async (chapter) => {
    const pool = await database.getPool();
    chapter.project_id = parseInt(chapter.project_id);

    const result = await pool.query("insert into chapters set ?", chapter);

    return result[0];
}

const update = async (chapter) => {
    const pool = await database.getPool();
    chapter.project_id = parseInt(chapter.project_id);
    chapter.id = parseInt(chapter.id);

    const result = await pool.query("update chapters set ? where id = ? and is_delete = 0", [chapter, chapter.id])

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from chapters where id = ? and is_delete = 0", [id]);

    return result[0];
}

const getChaptersByProjectId = async (project_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from chapters where project_id = ? and is_delete = 0", [project_id]);

    return result[0];
}

const deleteChapterById = async (project_id) => {
    const pool = await database.getPool();

    const result = await pool.query("update chapters set is_delete = 1 where id = ?", [project_id]);

    return result[0];
}

module.exports = {
    save,
    update,
    getById,
    getChaptersByProjectId,
    deleteChapterById
}