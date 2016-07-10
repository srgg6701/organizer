console.log("%cStart implementing in the js-async", 'color:blue');
var dt=new Date, tmt = setTimeout(function(){
    while(new Date - dt < 5000);
    console.log("%cFinish implementing in the js-async", 'color:blue');
    clearTimeout(tmt);
},0);
