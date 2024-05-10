class BaseErro extends Error {
    constructor({name,message,statusCode}){
        super()
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
    }
}

class ValidateError extends BaseErro {
    constructor(props){
        const {
            name,
            message,
            statusCode,
        } = props;

        super({
            name: 'ValidateError',
            message: message || ':( ocorreu um erro na validação',
            statusCode: statusCode || 400
        })
    }

}
class ServerValidationError extends BaseErro {
    constructor(props){
        const {
            name,
            message,
            statusCode,
        } = props;

        super({
            name: 'ServerValidationError',
            message: message || ':( ocorreu um erro na validação',
            statusCode: statusCode || 400
        })
    }

}

module.exports = {
    ValidateError,
    ServerValidationError
};