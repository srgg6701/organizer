var test = 'jasmine test',
    testObj = {
        name: 'testObj',
        getName: function(){
            console.log('name from testObj method: ', this.name);
            return this.name;
        }
    };