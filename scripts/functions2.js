/**
 * 1, 1*2=2, 2*3=6, 6*4=24, 24*5=120
 * @param n
 * @param cnt
 */
function factorial(n, cnt, sum){
    if(!cnt){
        var cnt= 0, sum=1;
        console.log('start count!');
    }
    if(cnt<n){
        cnt++;      // 1        2       3       4       5
        sum*=cnt;   // 1*=1     1*=2    2*=3    6*=4    24*=5
        // sum      //=1       =2      =6      =24     =120
        factorial(n, cnt, sum);
    }else{
        console.log('sum: ', sum);
    }
}

factorial(5);