/*
 sumTo(1) = 1
 sumTo(2) = 2 + 1 = 3
 sumTo(3) = 3 + 2 + 1 = 6
 sumTo(4) = 4 + 3 + 2 + 1 = 10
 ...
 sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
* */

function sumTo(nmb, sum) {
    if(!sum) sum=[nmb];
    if(nmb<=10){
        var sm=0;
        //++nmb;
        if(nmb>1) {
            sum.unshift(nmb);
            console.log('sum', sum);
        }//else sum = nmb; // 1
        sum.forEach(function(s, index, array){
            console.log('accumulate: ', sm+'+='+s);
            sm+=s;
            console.log('sm = '+sm);
        });
        ++nmb;
        //console.log('nmb = ' + nmb);
        sumTo(nmb, sum); // 1, 1 // 2, 1
    }else{
        console.log('finish, nmb = ', nmb);
    }
}
//sumTo(1);

function sumToSimple(nmb) {
    if(nmb<=10){
        console.log('nmb = ' + nmb);
        sumToSimple(++nmb);
    }else{
        console.log('finish, nmb = ', nmb);
    }
}
//sumToSimple(1);

function sumToFormula(n) {
    var result = n * (n + 1) / 2;
    console.log('result: ' + n + ' * (' + n + ' + 1) / 2 = ' + result);
    return result;
}
//sumToFormula(10);

function fact(f){
    // n! = n * (n - 1) * (n - 2) * ...*1
    var res=0, s=1, r, result;
    while(s<f){
        res+=f * function(){
            r = f-s;
            console.log('r = '+f+'-'+s+' = '+r);
            return r;
        }();
        console.log('res = ', res);
        s++;
    }

    result = f * res * 1;
    console.log('result = ' + f + ' * '+res+' * 1 = '+result);
}

fact(10);