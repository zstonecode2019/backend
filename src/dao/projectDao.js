const Database = require('../database');

const database = new Database();

const save = async (project) => {
    const pool = await database.getPool();
    project.user_id = parseInt(project.user_id);

    const result = await pool.query("insert into projects set ?", project);

    return result[0];
}

const update = async (project) => {
    const pool = await database.getPool();
    project.user_id = parseInt(project.user_id);
    project.id = parseInt(project.id);

    const result = await pool.query("update projects set ? where id = ?", [project, project.id]);
    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from projects where id = ?", [id]);

    return result[0];
}

const getProjectsByUserId = async (user_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from projects where user_id = ?", [user_id]);

    return result[0];
}

module.exports = {
    save,
    update,
    getById,
    getProjectsByUserId
}