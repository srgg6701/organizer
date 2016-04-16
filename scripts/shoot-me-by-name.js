function makeArmy() {

    var shooters = [];

    for (var i = 0; i < 10; i++) {

        var shooter = function me() {
            console.log('i = ' + me.i);
        };
        shooter.i = i;

        shooters.push(shooter);
    }

    return shooters;
}

var army = makeArmy();

army[0](); // 0
army[5](); // 1