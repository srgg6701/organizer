window.onload = function(){
    console.log('dashboard works');
    manageData();
};

function dragStart(event){
    console.log('dragStart', event.target);
}

function dragOver(event){
    //console.log('dragOver', event.target);
}

function dragEnter(event){
    //console.log('dragEnter', event.target);
}

function dragLeave(event){
    //console.log('dragLeave', event.target);
}

function drop(event) {
    console.log('drop', event.target);
    event.preventDefault();
    var transferredElementId = event.dataTransfer.getData("text"),
        droppingElement = document.getElementById(transferredElementId);
    try {
        var transferType = this.dataset.transferType, // copy, move
            node = this;
        if (event.target.id == 'dest_' + transferType) {
            if (transferType == 'copy') {
                node = node.cloneNode(true);
                node.id = node.id + "_copy";
            }
            modifyClassList(event.currentTarget, 1);
            modifyClassList(node, 2);
            event.target.appendChild(node);
        }
    } catch (e) {
        console.error(e.message);
    }
}

function dragEnd(event){
    console.log('dragEnd', event.target);
    // Remove all of the drag data
    event.dataTransfer.clearData();
    /** • Тут нюанс. Отловить непосредственно элемент event.target.parentNode
     не всегда возможно */
    modifyClassList(event.currentTarget, 1);
    modifyClassList(event.currentTarget, 2);
    /** проверить блоки с неудалённым классом 'drag-over'.
     ситуация возникает, когда после события *over* не наступает
     событие *leave* для данного объекта, что происходит, если
     перемещаемый элемент не может быть на него сброшен. */
    var overRemains=document.getElementsByClassName('drag-over');
    if(overRemains.length){
        for(var i= 0, j=overRemains.length; i<j; i++){
            modifyClassList(overRemains[i], 1);
        }
    }}


function showArgs(event){
    var args=[];
    for(var i= 0, j=arguments.length; i<j; i++){
        args.push(arguments[i]);
    }
    return args;
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

/**
 * Удалить копию задачи с нижней панели
 * @param element
 */
function removeIssueCopyFromPanel(element){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='removeIssueCopyFromPanel';

    // clarify: Не нужно ли (и возможно ли?) добавить наблюдателей в цикле, убрав из тегов? И что с angular-подходом тогда?
    console.groupCollapsed('%cremoveIssueCopyFromPanel', 'color:darkred', showArgs(arguments));
    var card=element.parentNode,
        taskId = getTaskId(card),
        drawnElementPanel = dragStore.getDrawnElement(taskId);
    console.log({ card:card, taskId:taskId, drawnElementPanel:drawnElementPanel });
    /** удалить ранее сохранённый элемент, чтобы не блокировал
     повторное копирование данных */
    if(drawnElementPanel&&drawnElementPanel.innerHTML==card.innerHTML){
        dragStore.removeDrawnElementCopy(taskId);
    }
    console.log('remove card', { cardParentNode: card.parentNode, card: card});
    card.parentNode.removeChild(card);
    console.groupEnd();
}