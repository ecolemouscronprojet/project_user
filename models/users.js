const { v4: uuidv4 } = require('uuid');

const userModel = {
    users: []
}

setInterval(() => {
    console.log(userModel.users)
}, 4000)


userModel.save = function(user) {
    // modification
    if(user.id) {
        // trouver l'utilisateur
        const userDB = userModel.users.find(u => u.id === user.id)
        // mettre à jour l'utilisateur
        if (userDB) {
            userDB.firstname = user.firstname
            userDB.lastname =  user.lastname
            return ;
        }
    }
    
    // création
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
