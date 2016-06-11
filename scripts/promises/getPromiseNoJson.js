define(function(){
    return function getPromiseNoJson(){
        var jsonPromise = new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', 'fake.json');
            xhr.onload = function(){
                if(xhr.status==200){
                    // If there was some file, then you get it. But alas...
                    resolve(xhr.responseText);
                }else{
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror(Error(xhr.error));
        });

        jsonPromise.then(function(data) {
            // This never happens:
            console.log("It worked!", data);
        }).catch(function(err) {
            // Instead, this happens:
            console.log("It failed! No any file available.", err);
        });
    };
});