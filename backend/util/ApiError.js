
export default class ApiError extends Error{
    constructor(message, code=null, status=null, name=null){
        super();
        
        this.message = message
        this.status = status;
        this.stack = stack || null;
        this.name = name || this.constructor.name;
        this.code = code || `E_${this.name.toUpperCase()}`;
    }

}
