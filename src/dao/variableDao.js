const Database = require('../database');

const database = new Database();

const save = async (variable) => {
    const pool = await database.getPool();
    variable.project_id = parseInt(variable.project_id);

    const result = await pool.query("insert into variables set ?", variable);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from variables where id = ? and is_delete = 0", [id]);

    return result[0];
}

const getVariablesByProjectId = async (project_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from variables where project_id = ? and is_delete = 0", [project_id]);

    return result[0];
}

const deleteVariableById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("update variables set is_delete = 1 where id = ?", [id]);

    return result[0];
}

module.exports = {
    save,
    getById,
    getVariablesByProjectId,
    deleteVariableById
}