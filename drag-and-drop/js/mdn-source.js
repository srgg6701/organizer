function dragstart_handler(ev) {
    console.log("dragStart: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
    // Add this element's id to the drag payload so the drop handler will
    // know which element to add to its tree
    ev.dataTransfer.setData("text", ev.target.id);
    //ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.effectAllowed = "copy";
}

function dragover_handler(ev) {
    console.log("dragOver: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
    ev.preventDefault();
    // Set the dropEffect to move
    //ev.dataTransfer.dropEffect = "move"
    ev.dataTransfer.dropEffect = "copy";
}

function drop_handler(ev) {
    console.log("drop: dropEffect = " + ev.dataTransfer.dropEffect + " ; effectAllowed = " + ev.dataTransfer.effectAllowed);
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text");
    console.log({ 'ev.target': ev.target });
    try{
        ev.target.appendChild(document.getElementById(data));
    }catch(e){
        console.error(e.message);
    }
}


function cancel_dropping(){
    console.warn('Cancel dropping');
    return false;
}