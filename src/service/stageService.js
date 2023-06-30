const stageDao = require('../dao/stageDao');

const save = async (stage) => {
    const result = await stageDao.save(stage);
    return result;
}

const getById = async (id) => {
    const result = await stageDao.getById(id);
    if(Array.isArray(result) && result.length){
        return result[0];
    }else{
        return null;
    }
}

const getStagesByPageId = async (page_id) => {
    const result = await stageDao.getStagesByPageId(page_id);
    return result;
}

module.exports = {
    save,
    getById,
    getStagesByPageId
}