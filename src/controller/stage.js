const stageService = require('../service/stageService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const {id, uuid,name,page_id,engine,mode,render_info,effect_info,aspect } = req.body;
    const result = await stageService.save({ id, uuid, name, page_id, engine, mode, render_info, effect_info, aspect });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面存储到数据库失败！`));
    }
}

const getById = async (req, res) => {
    const { id } = req.query;
    const result = await stageService.getById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面不存在！`));
    }
}

const getStagesByPageId = async (req, res) => {
    const { page_id } = req.query;
    const result = await stageService.getStagesByPageId(page_id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getById': getById,
    'get /getStagesByPageId': getStagesByPageId
}