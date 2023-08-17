const dialogDao = require('../dao/dialogDao');

const save = async (dialog) => {
    let result;
    dialog.stage_id = parseInt(dialog.stage_id);
    if(dialog.id) {
        result = await dialogDao.update(dialog);
    } else {
        delete dialog.id;
        result = await dialogDao.save(dialog);
    }
    return result;
}

const getDialogById = async (id) => {
    const result = await dialogDao.getDialogById(id);
    return result;
}

const getDialogByStageId = async (stage_id) => {
    const result = await dialogDao.getDialogByStageId(stage_id);
    return result;
}

module.exports = {
    save,
    getDialogById,
    getDialogByStageId,
}