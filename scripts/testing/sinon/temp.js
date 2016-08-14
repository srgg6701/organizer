function setupNewUser(info, callback) {
    var user = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    };
    try {
        Database.save(user, callback);
    } catch (err) {
        callback(err);
    }
}










