function handleArgs() {
    var sum=0;
    /*for (var a in arguments) {
        sum+=arguments[a];
    }*/
    for(var i= 0, j=arguments.length; i<j; i++) {
        sum+=arguments[i];
    }
    return sum;
}

console.log('sum', handleArgs(2,5,3,0,-2,7));