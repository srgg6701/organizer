
describe("Should count", function(){
    it("Check sum", function(){
        expect(1+1).toBe(2);
    });
});

describe("jQuery tests", function () {
    //console.log('$', $);

    it("Should find jQuery", function () {
        expect($).not.toBeNull();
    });
    describe('jquery-jasmine plugin', function() {
        beforeEach(function() {
            setFixtures('<div id="elem">Hello World!</div>');
        });

        it('should be able to watch events', function() {
            spyOnEvent('#elem', 'click');
            $('#elem').click();
            expect('click').toHaveBeenTriggeredOn('#elem');
        });
    });
    it("Should find checked box", function(){
        expect($('<input type="checkbox" checked="checked"/>')).toBeChecked();
    });
    it("Should find inner list", function(){
        expect($('<div><ul></ul><h1>header</h1></div>')).toContainHtml('<ul></ul>')
    });
});

