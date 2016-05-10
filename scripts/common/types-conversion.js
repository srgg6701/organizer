var ob,
    data = {
        '{}':{},
        '[]':[],
        '""':"",
        '" "':" ",
        '0':0,
        '1':1
    };
Object.keys(data).forEach(function(key, index, array){
    if(!ob){
        var len=array.length;
        //console.log('len', len);
    }

    ob=data[key];

    console.log(typeof ob+': '+key);
    console.log('+'+key, '\t\t\t\t\t', +ob);
    console.log('-'+key, '\t\t\t\t\t', -ob);
    console.log(key+'-1', '\t\t\t\t', ob-1);
    console.log('parseInt('+key+')', '\t\t', parseInt(ob));
    console.log('Number('+key+')', '\t\t\t', Number(ob));
    console.log('String('+key+')', '\t\t\t', String(ob));
    console.log('toString.call('+key+')', '\t', toString.call(ob));
    console.log('• '+key+'+'+key, ' = \t\t\t\t', ob+ob);

    if(array[index+1]){
        console.log('■ '+key+'+'+array[index+1]+' = ', ob+data[array[index+1]]);
    }
    //console.log('\n');
}); 
