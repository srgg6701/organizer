var Promise = function(){
    this.successCallbacks = [];
    this.failCallbacks = [];
};
Promise.prototype = {
    successCallbacks: null,
    failCallbacks: null,
    then: function(success, fail){
        this.successCallbacks.push(success); // PromiseInstance.successCallbacks
        if(fail){
            this.failCallbacks.push(fail);
        }
    }
};
var Defer = function(){
    this.promise = new Promise();
};
Defer.prototype = {
    promise: null,
    resolve: function(data){
        this.promise.successCallbacks.forEach(function(callback){
            setTimeout(function() {
                callback(data);
            },0)
        });
    },
    reject: function(error){
        this.promise.failCallbacks.forEach(function(callback){
            setTimeout(function() {
                callback(error);
            },0)
        });
    }
};
/**
 var deferred = new Defer()
    // promise *new Promise
        // promise.successCallbacks *[]
        // promise.failCallbacks *[]
        // PROTOTYPE:
            // resolve  *function
            // reject   *function
 */

function downloadData(){
    var defer = new Defer();
    serverCall(
        // run by timeout
        function(request){ // request = { status: 200, respondText: 'Got data from sever' }
            if(request.status==200){
                defer.resolve(request.responseText);
            }else{
                defer.reject(new Error(request.status));
            }
        });
    return defer.promise;
}

function serverCall(callback){ // function (resolve){ ... }
    setTimeout(function(){
        callback({
            status:200,
            respondText: 'Got data from sever'
        })
    }, 2000);
}
/**
 * Внутри выполняется serverCall, по таймауту вызывающий callback,
 * который вызывает defer.resolve, в цикле вызывающий все функции,
 * которые добавляются в массив successCallbacks методом then
 * и передаются ему (then) в качестве параметров
 * returns defer.promise
 */
downloadData()
    .then(function(response){ // response ─ аргумент resolve
            console.log('I did it: '+response);
        }, function (error){
            console.log(error);
        });