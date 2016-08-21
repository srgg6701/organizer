$(function() {

    function wait(delay) {
        console.log('%cwait, delay:', 'color: rebeccapurple', delay);
        var nd = new Date;
        while (new Date - nd < delay);
        console.log('I see, you waited for me so patiently.\nTime has passed:', (new Date - nd)/1000);
        return true;
    }

    function trustMe(delay) {
        console.log('%ctrustMe, delay:', 'color:green', delay);
        var tmt = setTimeout(function() {
            console.log('I see, you trast me :)');
            return true;
        }, delay);
    }

    function runWaiter() {
        console.log('runWaiter here');
        var repeator = 500,
            delayShort = 3000,
            delayLong = 5000,
            cnt = 0,
            ntrv = setInterval(function() {
                console.log('%ccnt: ' + ++cnt, 'color:blue');
                if (cnt * repeator >= delayLong) {
                    clearInterval(ntrv);
                }
            }, 500);
        $.when(wait(3000), trustMe(5000)).done(function() {
            console.log('%cEverything is done!', 'background-color:lightskyblue');
        }).fail(function() {
            console.log('You are fail, Dude!');
        });
    }

    $('#btn-run-waiter').on('click', runWaiter);
})