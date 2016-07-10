console.log('receiver is ready');
window.addEventListener("message", function listener(event){
    //if ( event.origin !== "http://javascript.info" ) return;
    var container=document.getElementById("test");
    container.innerHTML = "received: "+event.data;
    console.log({'event': event, container:container});
}, false);
