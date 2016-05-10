var funcThis = function(){
    this.name = 'funcThis name';
    var showName = function(){
        console.log('this name = '+this.name);
    }.bind(this);
    showName();
};

var ob = {};

funcThis.call(ob);