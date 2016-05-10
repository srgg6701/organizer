//jasmine.getFixtures().fixturesPath = 'fixture';
// async: https://www.udacity.com/course/viewer#!/c-ud549/l-3773158892/m-3871168615
xdescribe("Should count", function(){
    it("Check sum", function(){
        expect(1+1).toBe(2);
    });
});
describe('Set fixtures', function() {
    beforeEach(function() {
        setFixtures('<div id="elem">Hello World!</div>');
    });

    it('should be able to watch events', function() {
        spyOnEvent('#elem', 'click');
        $('#elem').click();
        expect('click').toHaveBeenTriggeredOn('#elem');
    });
});

describe('Load fixtures', function() {
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
    xit("Should find jQuery", function () {
        expect($).not.toBeNull();
    });

    it("Should find checked box", function(){
        expect($('<input type="checkbox" checked="checked"/>')).toBeChecked();
    });
    it("Should find inner list", function(){
        expect($('<div><ul></ul><h1>header</h1></div>')).toContainHtml('<ul></ul>')
    });
});

