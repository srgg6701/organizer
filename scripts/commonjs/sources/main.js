var modex = require('./source');
console.log('is it here? ', modex.greetMe);
//window.greetMe = modex.greetMe;
module.exports = {
    greetMe: modex.greetMe
}