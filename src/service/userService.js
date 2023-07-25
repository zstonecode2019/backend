const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userDao = require('../dao/userDao');

const getUserList = async () => {
    const result = await userDao.getUserList();
    return result;
}

const getUserById = async (id) => {
    const result = await userDao.getUserById(id);
    return result;
}

const login = async (name, password) => {
    const md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    const result = await userDao.login(name, password);

    if (result.length === 0) {
        return '';
    } else {
        let { id, name, password, nickname } = result[0];
        let older_token = jwt.sign({ name, password, iat: Math.floor(Date.now() / 1000) }, 'shhhhh');
        return { token: older_token, nickname, name, id };
    }
}

const register = async (userInfo) => {
    const md5 = crypto.createHash('md5');
    userInfo.password = md5.update(userInfo.password).digest('hex');
    const result = await userDao.register(userInfo);
    return result;
}

module.exports = {
    getUserList,
    login,
    register,
    getUserById
}