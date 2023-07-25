const variableDao = require('../dao/variableDao');

const save = async (variable) => {
    const result = await variableDao.save(variable);
    return result;
}

const getById = async (id) => {
    const result = await variableDao.getById(id);
    if(Array.isArray(result) && result.length){
        return result[0];
    }else{
        return null;
    }
}

const getVariablesByProjectId = async (project_id) => {
    const result = await variableDao.getVariablesByProjectId(project_id);
    return result;
}

const deleteVariableById = async (id) => {
    const result = await variableDao.deleteVariableById(id);
    return result;
}

module.exports = {
    save,
    getById,
    getVariablesByProjectId,
    deleteVariableById
}