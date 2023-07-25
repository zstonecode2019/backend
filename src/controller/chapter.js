const chapterService = require('../service/chapterService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const { id,name,uuid,project_id } = req.body;
    const result = await chapterService.save({ id,name,uuid,project_id });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`章节存储到数据库失败！`));
    }
}

const getById = async (req, res) => {
    const { id } = req.query;
    const result = await chapterService.getById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`章节不存在！`));
    }
}

const getChaptersByProjectId = async (req, res) => {
    const { project_id } = req.query;
    const result = await chapterService.getChaptersByProjectId(project_id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`章节不存在！`));
    }
}

const deleteChapterById = async (req, res) => {
    const { id } = req.query;
    const result = await chapterService.deleteChapterById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`章节不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getById': getById,
    'get /getChaptersByProjectId': getChaptersByProjectId,
    'get /deleteChapterById': deleteChapterById
}