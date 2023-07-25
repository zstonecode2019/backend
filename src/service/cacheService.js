const cacheDao = require('../dao/cacheDao');

const save = async (cache) => {
    const result = await cacheDao.save(cache);
    return result;
}

const getByKey = async (key) => {
    const result = await cacheDao.getByKey(key);
    return result;
}


module.exports = {
    save,
    getByKey,
}