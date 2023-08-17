const Database = require('../database');

const database = new Database();

const save = async (dialog) => {
    const pool = await database.getPool();

    let result;
    try {
        result = await pool.query("insert into dialogs set ?", dialog);
    }catch(e){
        console.log(e);
        return null;
    }

    return result[0];
}

const update = async (dialog) => {
    const pool = await database.getPool();

    const result = await pool.query("update dialogs set ? where id = ?", [dialog, dialog.id]);

    return result[0];
}

const getDialogById = async (id) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from dialogs where id = ?", id);

    return result[0][0];
}

const getDialogByStageId = async (stageId) => {
    const pool = await database.getPool();

    const result = await pool.query("select * from dialogs where stage_id = ?", stageId);

    return result[0][0];
}

module.exports = {
    save,
    update,
    getDialogById,
    getDialogByStageId
}