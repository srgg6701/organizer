define(function () {
    return function getDataOnLoad() {
        var promise = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', '../data/data.json');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    if (xhr.responseText) {
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        console.warn('No response text, statusText: ', xhr.statusText);
                    }
                } else {
                    reject(Error(xhr.statusText)); // or just *status*
                }
            };
            xhr.onerror = function () {
                reject(Error('Network error'));
            };
            xhr.send();
        });
        promise.then( handleResponse, // параметр resolve в функции-аргументе для promise
                      handleError     // параметр reject в функции-аргументе для promise
                    ) /*.then(function(response){
         console.log('parsed response: ', response);
         })*/;
    };
    function handleResponse(response){
        console.log("response ►", response);
    }
    function handleError(error) {
        console.error(error);
    }
});

