// ev ─ активный элемент
function dragstart_handler(ev) {
    console.groupCollapsed('dragStart');
        console.log('ev.target', ev.target);
    addClass(ev.currentTarget, 'start');
    ev.dataTransfer.setData("text", ev.target.id);
    // Tell the browser both copy and move are possible
    ev.effectAllowed = "copyMove";
    console.groupEnd();
}

function dragenter_handler(ev){
    console.groupCollapsed('Enter');
    console.log('ev.target', ev.target);
    console.groupEnd();
}
// ev ─ пассивный элемент, может быть другим ранее активным элементом!
function dragover_handler(ev) {
    ev.preventDefault();
    addClass(ev.currentTarget, 'over');
}
// ev.currentTarget ─ пассивный элемент
function dragleave_handler(ev) {
    console.groupCollapsed('Leave');
    console.log('ev.target', ev.target);
    removeClass(ev.target, 'over');
    console.groupEnd();
}
// droppingElement ─ активный элемент, извлекается из DOM по id
// ev.currentTarget ─ пассивный элемент
function drop_handler(ev) {
    console.groupCollapsed('Drop');
    ev.preventDefault();
    var transferredElementId = ev.dataTransfer.getData("text"),
        droppingElement = document.getElementById(transferredElementId);
    console.log({ 'ev.target':ev.target, droppingElement:droppingElement });
    dragFinish.call(droppingElement, ev);
    console.groupEnd();
}
// this, droppingElement ─ активный элемент
// ev ─ пассивный элемент
function dragFinish(ev) {
    console.groupCollapsed('dragFinish');
        console.log('ev.target', ev.target);
    try {
        var transferType = this.dataset.transferType, // copy, move
            node = this;
        if (ev.target.id == 'dest_' + transferType) {
            if (transferType == 'copy') {
                node = node.cloneNode(true);
                node.id = node.id + "_copy";
            }
            removeClass(node, 'start');
            removeClass(ev.target, 'over');
            ev.target.appendChild(node);
        }
    } catch (e) {
        console.error(e.message);
    }
    console.groupEnd();
}
// активный элемент
function dragend_handler(ev) {
    console.groupCollapsed('dragEnd');
    console.log('ev.target', ev.target);
    // Remove all of the drag data
    ev.dataTransfer.clearData();
    /** • Тут нюанс. Отловить непосредственно элемент ev.target.parentNode
        не всегда возможно */
    removeClass(ev.target, 'over');
    removeClass(ev.target, 'start');
    /** проверить блоки с неудалённым классом 'drag-over'.
        ситуация возможна, когда после события over не возникает
        события leave для данного объекта, что происходит, если
        перемещаемый элемент не может быть на него сброшен. */
    var overRemains=document.getElementsByClassName('drag-over');
    if(overRemains.length){
        for(var i= 0, j=overRemains.length; i<j; i++){
            removeClass(overRemains[i], 'over');
        }
    }
    console.groupEnd();
    console.log('- - - - - - - - - - - -');
}

function removeClass(element, name){
    if(element.classList) {
        if(element.classList.contains('drag-'+name)) {
            console.log('removeClass', {element: element, name: name});
            element.classList.remove('drag-' + name);
            console.trace();
        }
    }
}
function addClass(element, name){
    if(element.classList) {
        if(!element.classList.contains('drag-'+name)){
            console.log('addClass', { element:element, name:name });
            element.classList.add('drag-'+name);
            console.trace();
        }
    }
}