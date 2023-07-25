const entityDao = require('../dao/entityDao');

const save = async (entity) => {
    let result;
    if (entity.id) {
        result = await entityDao.update(entity);
    } else {
        delete entity.id;
        result = await entityDao.save(entity);
    }
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

const deleteEntityById = async (id) => {
    const result = await entityDao.deleteEntityById(id);
    return result;
}

module.exports = {
    save,
    getById,
    getEntitiesByStageId,
    deleteEntityById
}