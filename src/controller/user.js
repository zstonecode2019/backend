const userService = require('../service/userService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const register = async (req, res) => {
    const { name, avatar, nickname, password, gender, phone_number, email, address, birthday } = req.body;
    const result = await userService.register({ name, avatar, nickname, password, gender, phone_number, email, address, birthday });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`User ${name} already exists`));
    }
}

const login = async (req, res) => {
    const { name, password } = req.body;
    const token = await userService.login(name, password);
    res.send(ResponseWrapper.success(token));
}

const getUserList = async (req, res) => {
    const result = await userService.getUserList();
    res.send(ResponseWrapper.success(result));
}

module.exports = {
    'get /getUserList': getUserList,
    'post /register': register,
    'post /login': login,
}