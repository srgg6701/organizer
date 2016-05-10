describe("Should work", function(){
    it("Check sum", function(){
        expect(1+1).toBe(2);
    });

    var str = "Hello, Dude!";
    it("Check string", function(){
        expect(str).toMatch("Hello, Dude!");
    });

    it("Check type string", function(){
        expect(typeof str).toMatch("string");
    });

    /*it("Check wrong sum", function(){
        expect(1+1).toBe(3);
    });*/
});

