const assetDao = require('../dao/assetDao');

const save = async (asset) => {
    asset.user_id = parseInt(asset.user_id);
    const result = await assetDao.save(asset);
    return result;
}

const getById = async (id) => {
    const result = await assetDao.getById(id);
    if(Array.isArray(result) && result.length){
        return result[0];
    }else{
        return null;
    }
}

module.exports = {
    save,
    getById,
}