const pageDao = require('../dao/pageDao');

const save = async (page) => {
    let result;
    if(page.id) {
        result = await pageDao.update(page);
    } else {
        delete page.id;
        result = await pageDao.save(page);
    }
    return result;
}

const getById = async (id) => {
    const result = await pageDao.getById(id);
    if(Array.isArray(result) && result.length){
        return result[0];
    }else{
        return null;
    }
}

const getPagesByChapterId = async (chapter_id) => {
    const result = await pageDao.getPagesByChapterId(chapter_id);
    return result;
}

const deletePageById = async (id) => {
    const result = await pageDao.deletePageById(id);
    return result;
}

module.exports = {
    save,
    getById,
    getPagesByChapterId,
    deletePageById,
}