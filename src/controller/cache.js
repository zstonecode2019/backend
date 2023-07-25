const cacheService = require('../service/cacheService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    const { key, value } = req.body;
    const result = await cacheService.save({key, value});
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`json存储到redis失败！`));
    }
}

const getByKey = async (req, res) => {
    const { key } = req.query;
    const result = await cacheService.getByKey(key);
    if (result) {
        res.send(ResponseWrapper.success(result));
    } else {
        res.send(ResponseWrapper.error(`json不存在！`));
    }
}


module.exports = {
    'post /save': save,
    'get /getByKey': getByKey,
}