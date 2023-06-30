const entityDao = require('../dao/entityDao');

const save = async (entity) => {
    const result = await entityDao.save(entity);
    return result;
}

const getById = async (id) => {
    const result = await entityDao.getById(id);
    if(Array.isArray(result) && result.length){
        return result[0];
    }else{
        return null;
    }
}

const getEntitiesByStageId = async (stage_id) => {
    const result = await entityDao.getEntitiesByStageId(stage_id);
    return result;
}

module.exports = {
    save,
    getById,
    getEntitiesByStageId
}