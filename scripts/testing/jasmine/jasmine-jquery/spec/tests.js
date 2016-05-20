jasmine.getFixtures().fixturesPath = './';
// async: https://www.udacity.com/course/viewer#!/c-ud549/l-3773158892/m-3871168615
xdescribe("Should count", function(){
    it("Check sum", function(){
        expect(1+1).toBe(2);
    });
});
xdescribe('Set fixtures', function() {
    beforeEach(function() {
        setFixtures('<div id="elem">Hello World!</div>');
    });

    it('should be able to watch events', function() {
        spyOnEvent('#elem', 'click');
        $('#elem').click();
        expect('click').toHaveBeenTriggeredOn('#elem');
    });
});
xdescribe('Load fixtures', function() {
    beforeEach(function() {
        loadFixtures('ul.html');
    });
    it('Should find unordered list', function(){
        var list = $('#ul-1');
        expect(list).not.toBeNull();
        expect(list[0].id).toMatch('ul-1');
    });
});
describe("jQuery tests", function () {
    var sfix;
    beforeEach(function(){
        loadFixtures('ul.html');
        sfix = readFixtures('ol.html');
        //this.ul1 = $('#ul-1');
        //this.ul = $('<input type="checkbox" checked="checked"/>');
    });
    /*var ul= $.get('ul.html', function(data){
        var ndt=new Date;
        while(new Date - ndt < 3000){}
        console.log('data', data);
    });*/
    /*it('Should be element', function(done){
        console.log('Make it!');
        expect(ul).not.toBeNull();
        done();
    });*/
    /*it('Should check test js file', function(){
        expect(test).toBeDefined();
        expect(testObj).toBeDefined();
        expect(testObj.getName).toBeDefined();
    });*/

    it('Should spy on testObj and callThrough', function(){
        spyOn(testObj, 'getName').and.callThrough();
        testObj.getName();
        expect(testObj.getName).toHaveBeenCalled();
    });

    it('Should spy on testObj and returnValue', function(){
        spyOn(testObj, 'getName').and.returnValue('It is fake, Dude!');
        expect(testObj.getName()).toBe('It is fake, Dude!');
    });

    it('Should spy on testObj and callFake', function(){
        spyOn(testObj, 'getName').and.callFake(function(){
            return 'Yo, man!';
        });
        expect(testObj.getName()).toBe('Yo, man!');
    });

    xit('Should get element from fixture', function(){
        expect($('.list')).toExist();
        expect(sfix).toContain('li');
    });
    xit("Should find jQuery", function () {
        expect($).not.toBeNull();
    });
    xit("Should find checked box", function(){
        expect(this.ul).toBeChecked();
    });
    xit("Should find inner list", function(){
        expect($('<div><ul></ul><h1>header</h1></div>')).toContainHtml('<ul></ul>')
    });
    xit('Should have sandbox', function(){
        expect(sandbox).toBeDefined();
        var sbox = sandbox(),
            p = '<p>Hello</p>';
        sbox.html(p);
        expect(sbox.html()).toBe(p);
        console.log('sandbox', sbox);
    });
});

