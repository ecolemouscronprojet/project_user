const { v4: uuidv4 } = require('uuid');

const addressModel = {
    addresses: []
}


addressModel.save = function(address) {
    // modification
    if(address.id) {
        // trouver l'utilisateur
        const addressDB = addressModel.addresses.find(u => u.id === address.id)
        // mettre à jour l'utilisateur
        if (addressDB) {
            addressDB.street = address.street
            addressDB.number = address.number
            addressDB.city = address.city
            addressDB.zipCode = address.zipCode
            addressDB.country = address.country            
            return ;
        }
    }
    
    // création
    address.id = uuidv4()
    addressModel.addresses.push(address)
}

addressModel.delete = function(id) {
    const addressIndex = addressModel.addresses.findIndex(function(address) {
        return address.id === id
    })
    if(addressIndex !== -1) {
        addressModel.addresses.splice(addressIndex, 1)
        return true
    }

    return false
}

module.exports = addressModel
