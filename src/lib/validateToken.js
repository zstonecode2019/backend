const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');

const validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, 'shhhhh');
        const { name, password, iat } = decoded;
        const result = await userDao.login(name, password);
        let expiredTime = process.env.TOKEN_EXPIRED_TIME || 60;
        const isExpired = Math.floor(Date.now() / 1000) - iat > expiredTime;
        if (!result.length) {
            return {
                flag: false,
                message: "User not found"
            }
        }
        if (isExpired) {
            return {
                flag: false,
                message: "Token is expired"
            }
        }
        return {
            flag: true,
            message: "Token is good"
        };
    } catch (err) {
        return {
            flag: false,
            message: "error occurred"
        };
    }
}

module.exports = validateToken;