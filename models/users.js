const { v4: uuidv4 } = require('uuid');

const userModel = {
    users: []
}


userModel.save = function(user) {
    user.id = uuidv4()
    userModel.users.push(user)
}

userModel.delete = function(id) {
    const userIndex = userModel.users.findIndex(function(user) {
        return user.id === id
    })
    if(userIndex !== -1) {
        userModel.users.splice(userIndex, 1)
        return true
    }

    return false
}

module.exports = userModel
