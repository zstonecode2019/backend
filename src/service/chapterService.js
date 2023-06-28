const chapterDao = require('../dao/chapterDao');

const save = async (chapter) => {
    const result = await chapterDao.save(chapter);
    return result;
}

const getById = async (id) => {
    const result = await chapterDao.getById(id);
    if(Array.isArray(result) && result.length){
        return result[0];
    }else{
        return null;
    }
}

const getChaptersByProjectId = async (project_id) => {
    const result = await chapterDao.getChaptersByProjectId(project_id);
    return result;
}

module.exports = {
    save,
    getById,
    getChaptersByProjectId
}