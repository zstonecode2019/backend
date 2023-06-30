const entityService = require('../service/entityService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const { stage_id,name,type,belong_scene,position,rotation,scale,uuid, container_id } = req.body;
    const result = await entityService.save({ stage_id,name,type,belong_scene,position,rotation,scale,uuid,container_id });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面存储到数据库失败！`));
    }
}

const getById = async (req, res) => {
    const { id } = req.query;
    const result = await entityService.getById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面不存在！`));
    }
}

const getEntitiesByStageId = async (req, res) => {
    const { stage_id } = req.query;
    const result = await entityService.getEntitiesByStageId(stage_id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getById': getById,
    'get /getEntitiesByStageId': getEntitiesByStageId
}