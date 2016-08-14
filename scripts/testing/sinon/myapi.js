var myapi = {
    get: function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://jsonplaceholder.typicode.com/posts/1', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(null, JSON.parse(xhr.responseText));
                }
                else {
                    callback(xhr.status);
                }
            }
        };
        xhr.send();
    },
    get2: function (callback, data) {
        $.ajax('data.json', {
            success:callback(data),
            error: function(){
                console.log('Failed');
            },
            complete: function(){
                console.log('Completed');
            }
        });
    },
    post: function (data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://jsonplaceholder.typicode.com/posts', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback();
            }
        };
        xhr.send(JSON.stringify(data));
    }
};