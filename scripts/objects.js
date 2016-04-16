var ob={
    name:'Hector',
    tree:{
        futher:'Hall',
        mother:'Math'
    }
};
function discoverObjectInDepth(ob){
    for(var prop in ob){
        if(ob.hasOwnProperty(prop)){
            if(typeof ob[prop] == 'string')
                console.log(prop+':'+ob[prop]);
            else if(typeof ob[prop] == 'object'){
                if(Object.prototype.toString.call(ob[prop]) == '[object Object]'){
                    //console.group(prop); // caused an error in debugging mode in IDE
                    discoverObjectInDepth(ob[prop]);
                    //console.groupEnd();
                }
            }
        }
    }
}
//discoverObjectInDepth(ob);

var salaries = {
    vasja:500,
    petja:1400,
    masha:350,
    gosha:1000
};

/*var sum=0;
Object.keys(salaries).forEach(function(key){
    sum+=salaries[key];
    console.log('sum', sum);
    return sum;
});*/

var biggest=0;
for(var s in salaries){
    if (salaries[s]>biggest){
        biggest=salaries[s];
    }
}
console.log('biggest:', biggest);
//console.log('sum', sum);
