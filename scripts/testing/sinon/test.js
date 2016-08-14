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
    it('should parse fetched data as JSON', function (done) {
        var data = {foo: 'bar'};
        var dataJson = JSON.stringify(data);
        myapi.get(function (err, result) {
            expect(result).to.deep.equal(data);
            done();
        });
        requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
    });
    it('should send given data as JSON body', function() {
        var data = { hello: 'world'},
            dataJson = JSON.stringify(data);
        myapi.post(data, function() { });
        expect(requests[0].requestBody).to.equal(dataJson);
    });
});
