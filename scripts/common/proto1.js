function Fnc(){}
Fnc.prototype.fooz = function(){
    var i=0;
    Fnc.prototype.fooz = function(){
        i++;
        console.log('i: ', i);
        return i;
    };
    return Fnc.prototype.fooz();
};

var fa = new Fnc();

alert(fa.fooz());
alert(fa.fooz());
alert(fa.fooz() + fa.fooz());