const assetService = require('../service/assetService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const { uuid,name,screen_type,file,user_id,type } = req.body;
    const result = await assetService.save({ uuid,name,screen_type,file,user_id,type });
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`资产存储到数据库失败！`));
    }
}

const getById = async (req, res) => {
    const { id } = req.query;
    const result = await assetService.getById(id);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`资产不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getById': getById,
}