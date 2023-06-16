class ResponseWrapper {
    static success(data) {
        return {
            code: 200,
            message: 'success',
            data: data,
        }
    }
    static error(error) {
        return {
            code: 500,
            message: 'error',
            data: error,
        }
    }
}

module.exports = ResponseWrapper;