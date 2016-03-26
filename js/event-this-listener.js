function goInside(_this, event) {
    console.log({_this: _this, this: this, event: event});
}
// if is being called within context of the listener, this is the listener's object!
function callb(){
    console.log({this: this, event: event});
}
window.onload = function () {
    el('link').addEventListener('click', function () {
        console.log({this: this, event: event});
    });
    el('link-captured').addEventListener('click', callb, true);
    el('link-onclick').onclick=function(){
        console.log('this', this);
    };
};