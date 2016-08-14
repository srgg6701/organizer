
describe("Test App", function () {
    it("Background checking", function () {
        console.log('expectations here');
        var div = $('<div/>')[0];
        App({
            root: div,
            'background-color':'green'
        });
        expect(div.style.backgroundColor).to.equal('green');
    });
});
