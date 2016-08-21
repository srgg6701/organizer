$(function() {
    var $redGuy = $('#redGuy'),
        $blueGuy = $('#blueGuy'),
        $bullet = $('#bullet'),
        bullet = {
            shot: function() {
                bullet.shot = $.Deferred();
                $bullet.show().animate({
                    left: '100%'
                }, 1000, bullet.shotFinished);
                return bullet.shot;
            },
            shotFinished: function() {
                bullet.shot.resolve();
            }
        },
        redGuy = {
            shootBlue: function() {
                return bullet.shot();
            }
        },
        blueGuy = {
            die: function() {
                $blueGuy.fadeOut(2000, function() {
                    console.log('%cYou killed me, partner!', 'color:darkred; font-weight:bold');
                });
            },
            shotFired: function(shot) {
                shot.done(blueGuy.die);
                shot.always(finishCombat);
                shot.reject();
            }
        },
        startCombat = function() {
            blueGuy.shotFired(redGuy.shootBlue());
            shot.done(function() {
                console.log('Battle resolved!');
            });
            shot.fail(function() {
                console.log('Battle rejected!');
            });
        },
        finishCombat = function() {
            console.log('Make love, not war©!');
        };
    $redGuy.on('click', startCombat);
});