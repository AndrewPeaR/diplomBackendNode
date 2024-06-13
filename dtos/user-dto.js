module.exports = class UserDto {
    id;
    email;
    isActivated;
    roleId;

    constructor(model){
        this.id = model.id
        this.email = model.email
        this.isActivated = model.isActivated
        this.userRoleId = model.userRoleId
    }
}