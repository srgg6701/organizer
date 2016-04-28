define(function(){
    return function getPromiseTimeout(x, stop){
        var promise = new Promise(function(resolve, reject){
            var intrvl=setTimeout(function(){
                if(x>10){
                    console.log('%cGoto resolve', 'background-color: lightskyblue');
                    resolve(x);
                }else{
                    reject(Error(" you're kidding me"));
                }  // clearTimeout(intrvl);
            }, 100*x);
        });
        promise.then(
            function(response) {
                console.log("Success, x = ", response);
                if(!stop) {
                    console.log('%cFirst promise message', 'color: rebeccapurple');
                    return getPromiseTimeout(20, true);
                }
            }, function(error) {
                console.error("Failed: "+error);
            })/*.then(function(response){
         console.log('%cSecond promise message', 'color: orange');
         })*/;
    };
});