// ev ─ активный элемент
function dragstart_handler(ev) {
    console.groupCollapsed('dragStart');
        console.log('ev.target', ev.target);
    modifyClassList(ev.currentTarget, 2, true);
    ev.dataTransfer.setData("text", ev.target.id);
    // Tell the browser both copy and move are possible
    ev.effectAllowed = "copyMove";
    console.groupEnd();
}
//
function dragenter_handler(ev){
    /*console.groupCollapsed('Enter');
    console.log('ev.target', ev.target);
    console.groupEnd();*/
}
// ev ─ пассивный элемент, может быть другим ранее активным элементом!
function dragover_handler(ev) {
    ev.preventDefault();
    modifyClassList(ev.currentTarget, 1, true);
}
// ev.currentTarget ─ пассивный элемент
function dragleave_handler(ev) {
    modifyClassList(ev.currentTarget, 1);
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
            modifyClassList(ev.currentTarget, 1);
            modifyClassList(node, 2);
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
    modifyClassList(ev.currentTarget, 1);
    modifyClassList(ev.currentTarget, 2);
    /** проверить блоки с неудалённым классом 'drag-over'.
        ситуация возникает, когда после события *over* не наступает
        событие *leave* для данного объекта, что происходит, если
        перемещаемый элемент не может быть на него сброшен. */
    var overRemains=document.getElementsByClassName('drag-over');
    if(overRemains.length){
        for(var i= 0, j=overRemains.length; i<j; i++){
            modifyClassList(overRemains[i], 1);
        }
    }
    console.groupEnd();
    console.log('- - - - - - - - - - - -');
}
//
function modifyClassList(element, classNumber, add){
    if(element.classList) {
        var func, className='drag-';
        switch (classNumber){
            case 1:
                className+='over';
                break;
            case 2:
                className+='start';
                break;
        }
        if(add){
            if(!element.classList.contains(className)) func='add';
        }else{
            if(element.classList.contains(className)) func='remove';
        }
        if(func) element.classList[func](className);
    }
}