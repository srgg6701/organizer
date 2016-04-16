var user = {
    firstName: "Василий",
    export: this,
    func: function(){
        return 'this.deep = '+this.deep;
    },
    deep: {
        export:this.firstName
    }
};

console.log({
    export:user.export,
    deepExport: user.deep.export,
    func: user.func()
});

var name = "",
    user2 = {
    name: "Василий",
    innerUserName:this.name, // undefined, because *this* here is window
    export: function() {
        return {
            value: this, // user2
            localUser: this.name // "Василий"
        };
    }
};

console.log({
    innerUser:user2.innerUser, // undefined
    'user2.export().value.name':user2.export().value.name
});