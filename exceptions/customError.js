module.exports = class CustomError extends Error {
    status;
    errors;
    
    constructor(message, status, errors){
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message, errors = []){
        return new CustomError(400, message, errors)
    }

    static UnauthorizedError(){
        return new CustomError(401, 'Ошибка доступа: Пользователь не авторизован')
    }

    static PermissonsError(){
        return new CustomError(403, 'Ошибка доступа: Недостаточно прав')
    }

    static PageNotFound(){
        return new CustomError(404, "Страница или ресурс не найден")
    }
}