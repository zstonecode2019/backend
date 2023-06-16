const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');

const getUserList = async () => {
    const result = await userDao.getUserList();
    return result;
}

const login = async (name, password) => {
    const result = await userDao.login(name, password);

    if (result.length === 0) {
        return '';
    } else {
        let { name, password, nickname } = result[0];
        let older_token = jwt.sign({ name, password, iat: Math.floor(Date.now() / 1000) }, 'shhhhh');
        return { token: older_token, nickname, name };
    }
}

const register = async (userInfo) => {
    const result = await userDao.register(userInfo);
    return result;
}

module.exports = {
    getUserList,
    login,
    register
}