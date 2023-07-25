const stageDao = require('../dao/stageDao');

const save = async (stage) => {
    let result;
    if(stage.id) {
        result = await stageDao.update(stage);
    }else{
        delete stage.id;
        result = await stageDao.save(stage);
    }
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