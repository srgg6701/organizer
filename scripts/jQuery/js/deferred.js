$(function() {

    var deffr = $.Deferred(),
        promise = deffr.promise();
    console.log({
        Deferred: deffr,
        'Deffered state init: ': deffr.state()
    });

    promise.then(function() {
        console.log('%cSuccess, ' + this.state(), 'background-color:lightgreen');
    }, function() {
        console.log('%cNo success, ' + this.state(), 'background-color:goldenrod');
    });

    promise.done(function() {
        console.log('%cpromise.done', 'color: blue; text-decoration: underline');
    });
    promise.fail(function() {
        console.log('%cpromise.fail', 'color: red; text-decoration: underline');
    });

    deffr.done(function() {
        console.log("Done");
    });

    deffr.fail(function() {
        console.log("Fail");
    });

    deffr.then(function() {
        console.log("%cОбъект Deferred принял состояние resolved.", 'color:green');
    }, function() {
        console.log("%cОбъект Deferred принял состояние rejected.", 'color:orangered');
    });

    deffr.always(function() {
        console.log('Always. Now state is', this.state());
        console.log("%cСостояние объекта Deferred может быть изменено только 1 раз!", 'background-color:#ff0');
    });

    $('.btn-success').on('click', function() {
        deffr.resolve();
    });
    $('.btn-warning').on('click', function() {
        deffr.reject();
    });

});