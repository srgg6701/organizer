//var jasmine = require('./../../../../_libs/jasmine/lib/jasmine-2.4.1/jasmine.js');
//console.log('jasmine', jasmine);
/**
 toMatch, toEqual, toContain, toBe, toBeFalsy, toBeTruthy,
 toBeCloseTo, toBeDefined,
 toBeGreaterThan, toBeLessThan, toHaveBeenCalledWith,
 toBeGreaterThan, toBeLessThan,
 toBeNaN, toBeNull, toBeUndefined,
 toHaveBeenCalled, toHaveBeenCalledTimes,
 toThrow, toThrowError
 */
xdescribe('All the tests', function(){
    it('Should work', function(){
        expect(2*2).toBe(4);
    });
});

describe("Should count", function(){
    it("Check sum", function(){
        expect(1+1).toBe(2);
    });
});

describe("jQuery tests", function () {
    var $=jQuery;
    it("Should show jQuery", function () {
        //console.log('jQuery', jQuery);
        //expect(jQuery).not.toBe(null);
        expect($('<input type="checkbox" checked="checked"/>')).toBeChecked();
        expect($('<div><ul></ul><h1>header</h1></div>')).toContainHtml('<ul></ul>')
    });
});

