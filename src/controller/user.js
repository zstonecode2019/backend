const userService = require('../service/userService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const register = async (req, res) => {
    const { name, avatar, nickname, password, gender, phone_number, email, address, birthday } = req.body;
    const result = await userService.register({ name, avatar, nickname, password, gender, phone_number, email, address, birthday });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`用户 ${name} 已经存在！`));
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    if (token) {
        res.send(ResponseWrapper.success(token));
    } else {
        res.send(ResponseWrapper.error(`用户 ${username} 不存在或者密码错误！`));
    }
}

const getUserList = async (req, res) => {
    const result = await userService.getUserList();
    if(result){
        res.send(ResponseWrapper.success(result));
    }else{
        res.send(ResponseWrapper.error(`用户列表不存在！`));
    }
}

const getUserById = async (req, res) => {
    const { id } = req.query;
    const result = await userService.getUserById(id);
    if(result){
        res.send(ResponseWrapper.success(result));
    }else{
        res.send(ResponseWrapper.error(`用户不存在！`));
    }
}

module.exports = {
    'get /getUserList': getUserList,
    'post /register': register,
    'post /login': login,
    'get /getUserById': getUserById,
}