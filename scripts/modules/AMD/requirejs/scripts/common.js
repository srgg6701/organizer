define(['scripts/subdued'],function (subdued) {
    console.log('subdued: %c'+subdued, 'color:orange');
    return {
        getHello: function () {
            return 'Hello World, you are a ';
        },
        subdued:subdued
    };
});