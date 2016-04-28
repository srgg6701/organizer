define(function(){
   return function getDataOnLoad(){
       var promise = new Promise(function (resolve, reject) {
           var xhr = new XMLHttpRequest();
           xhr.open('get', '../data/data.json');
           xhr.onload = function () {
               if(xhr.status===200){
                   resolve(xhr.responseText);
               }else{
                   reject(Error(xhr.statusText));
               }
           };
           xhr.onerror = function () {
               reject(Error('Network error'));
           };
           xhr.send();
       });
       promise.then(function(response) {
           console.log("Data ►", response);
           return JSON.parse(response);
       }, function(error) {
           console.error(error);
       }).then(function(response){
           console.log('parsed response: ', response);
       });
   }
});