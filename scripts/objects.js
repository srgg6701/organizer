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
discoverObjectInDepth(ob);

