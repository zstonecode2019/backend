const projectService = require('../service/projectService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const { name, path, screen, mode, user_id, theme, unique_id } = req.body;
    const result = await projectService.save({ name, path, screen, mode, user_id, theme, unique_id });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`项目存储到数据库失败！`));
    }
}

const getById = async (req, res) => {
    const { id } = req.query;
    const result = await projectService.getById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`项目不存在！`));
    }
}

const getProjectsByUserId = async (req, res) => {
    const { user_id } = req.query;
    const result = await projectService.getProjectsByUserId(user_id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`项目不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getById': getById,
    'get /getProjectsByUserId': getProjectsByUserId
}