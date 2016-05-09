require(['getData', 'getDataOnLoad', 'getPromiseNoJson', 'getPromiseTimeout'],
    function (getData, getDataOnLoad, getPromiseNoJson, getPromiseTimeout) {
        function handleNodes(selector, callback) {
            var items = document.querySelectorAll(selector);
            if (!items) {
                console.warn('No items: document.querySelectorAll(\'' + selector + '\')');
                return false;
            }//else console.dir(items);
            Array.prototype.forEach.call(items, function (item) {
                callback(item);
            });
        }

        /*console.log({
            getData:getData,
            getDataOnLoad:getDataOnLoad,
            getPromiseNoJson:getDataOnLoad,
            getPromiseTimeout:getPromiseTimeout
        });*/

        handleNodes('button', function (item) {
            item.addEventListener('click', function () {
                getPromiseTimeout(this.id.split('-').pop());
            });
        });
        handleNodes('#btn-promise', function (item) {
            item.addEventListener('click', getData);
        });
        handleNodes('#btn-promise-onload', function (item) {
            item.addEventListener('click', getDataOnLoad);
        });
        handleNodes('#btn-promise-no-json', function (item) {
            item.addEventListener('click', getPromiseNoJson);
        });


    });