const Database = require('../database');

const database = new Database();

const save = async (page) => {
    const pool = await database.getPool();
    page.chapter_id = parseInt(page.chapter_id);

    const result = await pool.query("insert into pages set ?", page);

    return result[0];
}

const update = async (page) => {
    const pool = await database.getPool();
    page.chapter_id = parseInt(page.chapter_id);
    page.id = parseInt(page.id);

    const result = await pool.query("update pages set ? where id = ? and is_delete = 0", [page, page.id]);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from pages where id = ? and is_delete = 0", [id]);

    return result[0];
}

const getPagesByChapterId = async (chapter_id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from pages where chapter_id = ? and is_delete = 0", [chapter_id]);

    return result[0];
}

const deletePageById = async (id) => {
    id = parseInt(id);
    const pool = await database.getPool();

    // const result = await pool.query("update pages set is_delete = 1 where id = ?", [id]);
    const conn = await pool.getConnection();
    try{
        const err = await conn.beginTransaction();
        const rs1 = await conn.query('UPDATE pages p SET p.is_delete = 1 WHERE p.id = ?;',[id]);
        const rs2 = await conn.query('update stage s set s.is_delete = 1 where s.page_id = ?;',[id]);
        const rs3 = await conn.query('UPDATE entities SET is_delete = 1 WHERE id IN ( select sub_entity.id from (SELECT id FROM entities WHERE stage_id = ( SELECT id FROM stage WHERE page_id = ? )) as sub_entity );',[id]);
    }catch(e){
        conn.rollback();
        return [];
    }
    const commit_rs = await conn.commit();
    return commit_rs[0];
}

module.exports = {
    save,
    update,
    getById,
    getPagesByChapterId,
    deletePageById
}