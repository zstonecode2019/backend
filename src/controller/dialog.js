const dialogService = require('../service/dialogService');
const ResponseWrapper = require('../lib/ResponseWrapper');

const save = async (req, res) => {
    try {
        const result = await dialogService.save(req.body);
        res.send(ResponseWrapper.success(result));
    } catch (error) {
        res.send(ResponseWrapper.error(error));
    }
}

const getDialogById = async (req, res) => {
    try {
        const result = await dialogService.getDialogById(req.query.id);
        if(result){
            res.send(ResponseWrapper.success(result));
        }else{
            res.send(ResponseWrapper.error('Dialog not found'));
        }
    } catch (error) {
        res.send(ResponseWrapper.error(error));
    }
}

const getDialogByStageId = async (req, res) => {
    try {
        const result = await dialogService.getDialogByStageId(req.query.stage_id);
        if(result){
            res.send(ResponseWrapper.success(result));
        }else{
            res.send(ResponseWrapper.error('Dialog not found'));
        }
    } catch (error) {
        res.send(ResponseWrapper.error(error));
    }
}

module.exports = {
    'post /save': save,
    'get /getById': getDialogById,
    'get /getDialogByStageId': getDialogByStageId,
}