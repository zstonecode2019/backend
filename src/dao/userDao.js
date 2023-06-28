const Database = require('../database');

const database = new Database();

const getUserList = async () => {
    const pool = await database.getPool();

    const result = await pool.query("select * from users");

    return result[0];
}

const getUserById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from users where id = ?", [id]);

    return result[0];
}

const login = async (name, password) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from users where name = ? and password = ?", [name, password]);

    return result[0];
}

const findUserByName = async (name) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from users where name = ?", [name]);

    return result[0];
}

const register = async (userInfo) => {
    const pool = await database.getPool();

    const user = await findUserByName(userInfo.name);
    if (user.length) {
        return;
    }

    const result = await pool.query("insert into users set ?", userInfo);

    return result[0];
}

module.exports = {
    getUserList,
    login,
    register,
    getUserById
}