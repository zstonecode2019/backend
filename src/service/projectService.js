const projectDao = require('../dao/projectDao');

const save = async (project) => {
    const result = await projectDao.save(project);
    return result;
}

const getById = async (id) => {
    const result = await projectDao.getById(id);
    if(Array.isArray(result) && result.length){
        return result[0];
    }else{
        return null;
    }
}

const getProjectsByUserId = async (user_id) => {
    const result = await projectDao.getProjectsByUserId(user_id);
    return result;
}

module.exports = {
    save,
    getById,
    getProjectsByUserId
}