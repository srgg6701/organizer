// http://stackoverflow.com/questions/36391032/js-strange-result-while-accessing-to-arguments-by-key/36391377#36391377
var getArgs=function(){
    var keys = Object.keys(arguments),
        args= arguments;

    /*for(var argKey in arguments){
        console.log('argument['+argKey+'] = '+arguments[argKey]);
    }*/
    //console.log('args', args);
    //var arr = ['one', 'two', 'three'];
    ['one', 'two', 'three'].forEach(function(argKey, index, arrAll){
        console.log({
            argKey:argKey,
            //arr: arr,
            //arrIndex:arr[index],
            arrAllIndex:arrAll[index],
            index:index
        });
        //console.log('current args: '+args[argKey]);
        //console.log('argument['+argKey+'] = '+arguments[argKey]);
    });
};

getArgs(5,3,2,11,15,7,-25);