const variableService = require('../service/variableService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const { name, uuid, key, value, project_id } = req.body;
    const result = await variableService.save({ name, uuid, key, value, project_id });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`变量存储到数据库失败！`));
    }
}

const getById = async (req, res) => {
    const { id } = req.query;
    const result = await variableService.getById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`变量不存在！`));
    }
}

const getVariablesByProjectId = async (req, res) => {
    const { project_id } = req.query;
    const result = await variableService.getVariablesByProjectId(project_id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`变量不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getById': getById,
    'get /getVariablesByProjectId': getVariablesByProjectId
}