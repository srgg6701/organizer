var priva = (function() {
    var data = {
        name: 'De',
        surname: 'Folt'
    };
    return function(dataType, dataValue) {
        if (dataValue) {
            data[dataType] = dataValue;
            console.log(dataType + ' is set to ' + dataValue);
        } else {
            return data[dataType];
        }
    }
})();

var say = function(params) {
    console.log('I said: ', params);
};

function myTree() {
    console.log('Dude, you have choosen the name: ', tree_name);
}

var varName = 'undergrounded';

var freeze = 'Try to unfreeze me!';
function def() {
    console.log('consoled here');
    return "Didn't you noticed something?";
}

//import { freeze, default as df } from './underwater';
var toKnow = priva();
var toSay = say();
window.onload = function() {
    window.tree_name = 'timber';
    document.getElementById('a-tree-name').onclick = function() {
        myTree();
    };
    console.log('varName = ' + varName + ', freeze = ' + freeze + ', df = ' + def());
};