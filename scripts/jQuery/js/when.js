$(function() {

    function wait(delay) {
        console.log('wait, delay:', delay);
        var nd = new Date;
        while (new Date - nd < delay);
        return true;
    }

    function runWaiter() {
        console.log('runWaiter here');
        $.when(wait(1000), wait(2000)).done(function() {
            console.log('Everything is done!');
        }).fail(function() {
            console.log('You are fail, Dude!');
        });
    }

    $('#btn-run-waiter').on('click', runWaiter);
})