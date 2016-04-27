require(['common', 'casual'], function(common, casual){
    console.log({'common':common, casual:casual});
    for(var item in casual){
        if(typeof casual[item]!='function'){
            console.log(item + ': ', casual.getStuff(item));
        }
    }
});