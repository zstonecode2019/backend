const Database = require('../database');

const database = new Database();

const save = async (asset) => {
    const pool = await database.getPool();

    const result = await pool.query("insert into assets set ?", asset);

    return result[0];
}

const getById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from assets where id = ? and is_delete = 0", [id]);

    return result[0];
}

const getByUserId = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from assets where user_id = ? and is_delete = 0", [id]);

    // 添加默认用户id为10的资产
    const default_user_id = 10;
    const default_result = await pool.query("select * from assets where user_id = ? and is_delete = 0", [default_user_id]);

    if(default_result && default_result.length){
        return result[0].concat(default_result[0])
    }

    return result[0];
}

module.exports = {
    save,
    getById,
    getByUserId
}