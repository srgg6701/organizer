define(function(){
    return function getPromiseNoJson(){
        var jsonPromise = new Promise(function(resolve, reject) {
            // JSON.parse throws an error if you feed it some
            // invalid JSON, so this implicitly rejects:
            resolve(JSON.parse("This ain't JSON"));
        });

        jsonPromise.then(function(data) {
            // This never happens:
            console.log("It worked!", data);
        }).catch(function(err) {
            // Instead, this happens:
            console.log("It failed!", err);
        });
    };
});