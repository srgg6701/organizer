import { priva } from './one';
import { say } from './two';
import { myTree } from './three';
import * as gr from './ground';
//import { freeze, default as df } from './underwater';
import df, { freeze } from './underwater';

//console.log('name:');

var toKnow = priva(),
    toSay = say();

window.onload = function() {
    window.tree_name = 'timber';
    document.getElementById('a-tree-name').onclick = function() {
        myTree();
    };
    console.log('varName = ' + gr.varName + ', freeze = ' + freeze + ', df = ' + df());
};