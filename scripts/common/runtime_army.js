function makeArmy() {

    var shooters = [], shooter, i;

    for (i = 0; i < 10; i++) {
        shooter = function(arg){ // функция-стрелок
            return function (){
                console.log('arg = ', arg);
            }
        }(i);
        shooters.push(shooter);
    }
    return shooters;
}
makeArmy().forEach(function(army){
    army();
});