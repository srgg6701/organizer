var getArgs=function(){
    var ob = arguments,
        keys = Object.keys(arguments),
        result, curr, prev;
    console.log(typeof ob, { keys:keys, arguments:arguments, ob:ob, '-----------------------------------':'' });
    keys.forEach(function(arg){
        curr = +arg;
        if(curr>=0){
            prev = (curr-1);
            if(ob[prev]){
                //console.log('prev = '+(prev), 'curr = '+curr);
                console.log(prev, curr, {
                    arguments: [
                        arguments[prev],
                        arguments[curr]
                    ],
                    ob:[
                        ob[prev],
                        ob[curr]
                    ]
                });
                if(!result || ob[curr]>result) result = ob[curr];
                //console.log('result: '+result);
            }
        }
    });
    console.log('result = '+result);
    /*keys.forEach(function(curr){
       console.log(curr, ob[curr])
    });*/
    /*for(var k in ob){
       console.log(k, ob[k]);
    }*/
    /*[0,1,2,3,4,5,6].forEach(function(curr){
        console.log(curr, ob[key])
    });*/

};

getArgs(5,3,2,11,15,7,-25);
//getArgs('first','second','third','fourth','fifth','sixth');

var getArgsArray=function(){
    var arr = arguments[0];
    console.log({
        'art keys': Object.keys(arr),
        'arr':arr
    });
    var max=arr.reduce(function(prev, next){
        console.log(
            'prev: '+ prev,
            'next: ' + next
        );
        return (next>prev) ? next:prev;
    });
    console.log('max = '+max);
    return max;
};

//getArgsArray([5,3,2,11,15,7,-25]);