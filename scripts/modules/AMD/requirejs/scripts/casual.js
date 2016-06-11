define(function () {
    return {
        suit: 'armor',
        vehicle: 'Shuttle',
        food: 'potato',
        getStuff: function(stuffName){
            return this[stuffName];
        }
    };
});