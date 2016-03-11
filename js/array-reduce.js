[1,2,3,4,5,6].reduce(function(prev, curr, index){
    console.log('curr: '+curr+', prev: '+prev);
    return '\nreturned:'+curr;
}); /*
curr: 2, prev: 1
curr: 3, prev:
returned:2
curr: 4, prev:
returned:3
curr: 5, prev:
returned:4
curr: 6, prev:
returned:5
"
returned:6" */