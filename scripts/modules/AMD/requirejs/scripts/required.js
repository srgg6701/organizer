define(function (require) {
    var slave = require('scripts/slave'),
        peasant = require('scripts/peasant');
    console.log({
        slave:slave,
        peasant:peasant
    });
    return {
        getHello: function () {
            return 'Here are: '+slave.who+' and '+peasant;
        },
        slave:slave,
        peasant:peasant
    };
});