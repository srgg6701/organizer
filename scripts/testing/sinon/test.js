var expect = chai.expect;
describe('MyAPI', function () {
    var xhr;
    var requests;
    beforeEach(function () {
        // substitute a real request with fake one
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        // if we make the call
        xhr.onCreate = function (xhr) {
            // add fake request to array of requests
            requests.push(xhr);
        };
    });
    afterEach(function () {
        // ?
        xhr.restore();
    });
    //Tests go here
    // • test get
    it('should parse fetched data as JSON', function (done) {
        var data = {foo: 'bar'};
        var dataJson = JSON.stringify(data);
        myapi.get(function (err, result) {
            expect(result).to.deep.equal(data);
            done();
        });
        requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
    });
    it('should parse fetched data as JSON, jQuery', function (done) {
        var data = {foo: 'bar'};
        var dataJson = JSON.stringify(data);
        myapi.get2(function (err, result, data) {
            expect(result).to.deep.equal(data);
            done();
        });
        requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
    });
    // • test post
    it('should send given data as JSON body', function() {
        var data = { hello: 'world'},
            dataJson = JSON.stringify(data);
        myapi.post(data, function() { });
        expect(requests[0].requestBody).to.equal(dataJson);
    });
    // • test fail
    it('should return error into callback', function(done) {
        myapi.get(function(err, result) {
            expect(err).to.exist;
            done();
        });
        //console.log({this:this, requests:requests});
        requests[0].respond(500);
    });
});
