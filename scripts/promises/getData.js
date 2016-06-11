define(function(){
    return function getData(){
        var promise = new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', '../data/data.json', true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState!==4) return false;
                if(xhr.status!==200) {
                    reject(Error('Network error'));
                    return false;
                }
                if(xhr.responseText){
                    resolve(xhr.responseText);
                }else {
                    reject(Error('No any response, Dude!'));
                }
            };
            xhr.send();
        });
        promise.then(
            function(response){
                console.log('response', response);
            },
            function(error){
                console.log(error);
            }
        );
    };
});