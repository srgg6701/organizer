function factorial(n,i,s){
    if(!i) {
        var i=1, s=1; // 4, 1, 1
    }else{
        i++;
        s++;
        s = i*(s-1); // 2*(2-1)
    }
    if(n) {
        console.log({n:n, i:i, s:s});
        factorial(n-1,i,s);
    }
}
factorial(5);