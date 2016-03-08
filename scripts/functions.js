var fnc=new Function('fnctn', 'console.log("fnc ran")');
// console.dir(fnc);

/* http://stackoverflow.com/questions/15455009/how-is-bind-different-from-call-apply-in-javascript
Call/apply call the function immediately, whereas bind returns a function that when later executed will have the correct context set for calling the original function. This way you can maintain context in async callbacks, and events.   */
