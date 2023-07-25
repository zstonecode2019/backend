const pageService = require('../service/pageService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const { id,name,uuid,chapter_id } = req.body;
    const result = await pageService.save({ id, name, uuid, chapter_id });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面存储到数据库失败！`));
    }
}

const getById = async (req, res) => {
    const { id } = req.query;
    const result = await pageService.getById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面不存在！`));
    }
}

const getPagesByChapterId = async (req, res) => {
    const { chapter_id } = req.query;
    const result = await pageService.getPagesByChapterId(chapter_id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面不存在！`));
    }
}

const deletePageById = async (req, res) => {
    const { id } = req.query;
    const result = await pageService.deletePageById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`页面不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getById': getById,
    'get /getPagesByChapterId': getPagesByChapterId,
    'get /deletePageById': deletePageById
}