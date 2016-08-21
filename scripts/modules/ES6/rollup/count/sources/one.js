var priva = (function() {
    var data = {
        name: 'De',
        surname: 'Folt'
    };
    return function(dataType, dataValue) {
        if (dataValue) {
            data[dataType] = dataValue;
            console.log(dataType + ' is set to ' + dataValue);
        } else {
            return data[dataType];
        }
    }
})();

export { priva };