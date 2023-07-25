const Database = require('../database');

const database = new Database();

const save = async (entity) => {
    const pool = await database.getPool();
    entity.stage_id = parseInt(entity.stage_id);

    const result = await pool.query("insert into entities set ?", entity);

    return result[0];
}

const update = async (entity) => {
    const pool = await database.getPool();
    entity.stage_id = parseInt(entity.stage_id);
    entity.id = parseInt(entity.id);

    const result = await pool.query("update entities set ? where id = ? and is_delete = 0", [entity, entity.id]);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from entities where id = ? and is_delete = 0", [id]);

    return result[0];
}

const getEntitiesByStageId = async (stage_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from entities where stage_id = ? and is_delete = 0", [stage_id]);

    return result[0];
}

const deleteEntityById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("update entities set is_delete = 1 where id = ?", [id]);

    return result[0];
}

module.exports = {
    save,
    update,
    getById,
    getEntitiesByStageId,
    deleteEntityById
}