function Dragstart(ev) {
    //console.log("dragStart: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
    console.log('%cDragstart: ', 'background-color:rgb(200,0,0); padding:4px 6px', { this:this, ev:ev });
    ev.dataTransfer.setData("text", ev.target.id);
    //ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.effectAllowed = "copy";
}

function Dragover(ev) {
    //console.log("dragOver: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
    console.log('%cDragover: ', 'background-color:rgb(0,200,0); padding:4px 6px', { this:this, ev:ev });
    ev.preventDefault();
    // Set the dropEffect to move
    //ev.dataTransfer.dropEffect = "move"
    ev.dataTransfer.dropEffect = "copy";
}

function Dragenter(ev){
    console.log('%cDragenter: ', 'background-color:rgb(0,0,200); padding:4px 6px', { this:this, ev:ev });
    ev.preventDefault();
}

function Dragleave(ev){
    console.log('%cDragleave: ', 'background-color:rgb(200,200,0); padding:4px 6px', { this:this, ev:ev });
    ev.preventDefault();
}

function Drop(ev) {
    //console.log("drop: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
    console.log('%cDrop: ', 'background-color:rgb(200,0,200); padding:4px 6px', { this:this, ev:ev });
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function Dragend(ev){
    console.log('%cDragend: ', 'background-color:rgb(50,50,50); color:white; padding:4px 6px', { this:this, ev:ev });
    ev.preventDefault();
}
