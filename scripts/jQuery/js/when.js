$(function() {

    function wait(delay) {
        console.log('%cwait, delay:', 'color: rebeccapurple', delay);
        var nd = new Date;
        while (new Date - nd < delay);
        console.log('wait is finished.\nTime has passed:', (new Date - nd) / 1000);
        return true;
    }

    function trustMe(delay) {
        console.log('%ctrustMe, delay:', 'color:green', delay);
        var tDef = $.Deferred(),
            tmt = setTimeout(function() {
                console.log('trustMe is finished');
                tDef.resolve();
            }, delay);
        return tDef;
    }

    function runWaiter() {
        console.log('runWaiter here');
        $.when(wait(2000), trustMe(4000)).done(function() {
            console.log('%cEverything is done!', 'background-color:lightskyblue');
        }).fail(function() {
            console.log('You are fail, Dude!');
        });
    }

    function loadData() {
        console.log('Let\'s load data');
        $.when($.get('http://localhost:8080/scripts/data/big-data.json', function(data) {
                console.log('data: ', data);
            }),
            $.get('http://localhost:8080/scripts/data/big-data-copy.json', function(data1) {
                console.log('data1: ', data1);
            })
        ).done(function() {
            console.log('%cEverything is done!', 'background-color:lightskyblue');
        }).fail(function() {
            console.log('You are fail, Dude!');
        });
    }

    $('#btn-run-waiter').on('click', runWaiter);
    $('#btn-load-data').on('click', loadData);
})