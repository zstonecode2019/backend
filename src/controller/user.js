const userService = require('../service/userService');
const ResponseWrapper = require('../lib/ResponseWrapper');
const { addLog } = require('../dao/logDao');

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
        const method = req.method;
        if(method !== 'OPTIONS'){
            const log = {
                type: 'login',
                target: 'users',
                target_id: token.id,
            }
            addLog(log);
        }
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

const getProjectsByUserId = async (req, res) => {
    const { userId } = req.query;
    const result = await userService.getProjectsByUserId(userId);
    if(result){
        res.send(ResponseWrapper.success(result));
    }else{
        res.send(ResponseWrapper.error(`用户${userId}没有项目！`));
    }
}

module.exports = {
    'get /getUserList': getUserList,
    'post /register': register,
    'post /login': login,
    'get /getUserById': getUserById,
    'get /getProjectsByUserId': getProjectsByUserId,
}