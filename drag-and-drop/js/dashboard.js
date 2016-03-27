window.onload = function(){
    console.log('dashboard works');
    manageData();
};

function dragStart(event){
    console.groupCollapsed('dragStart');
        console.log('event.target', { currentTarget:event.currentTarget, event: event });
    //Hello there, <strong>stranger</strong>
    modifyClassList(event.currentTarget, 2, true);
    event.dataTransfer.setData("text/html", event.target.outerHTML);
    event.dataTransfer.setData("text", event.target.dataset.element);
    event.effectAllowed = "copyMove";
    console.groupEnd();
}

function dragOver(event){
    //console.log('dragOver', event.target);
    event.preventDefault();
    if(event.target.dataset['element']!="group-card-container")
        modifyClassList(event.currentTarget, 1, true);
}

function dragEnter(event){
    //console.log('dragEnter', event.target);
    //event.preventDefault();
    //modifyClassList(event.currentTarget, 1, true);
}

function dragLeave(event){
    //console.log('dragLeave', event.target);
    modifyClassList(event.currentTarget, 1);
}

function drop(event) {
    event.preventDefault();

    console.group('drop');
        console.log(event.target);
    var transferredElementHTML = event.dataTransfer.getData("text/html"),
        transferredElementType = event.dataTransfer.getData("text");
        console.log('transferredElement', { type: transferredElementType, HTML: transferredElementHTML, thisElementType: this.dataset.element });
        /*,
        droppingElement = document.getElementById(transferredElementHTML);*/
    try {
        var //transferType = droppingElement.dataset.transferType, // copy, move
            clone;
        //console.log('target', event.target);
        /*if (event.target.id == 'dest_' + transferType) {
            if (transferType == 'copy') {
                clone = droppingElement.cloneNode(true);
                clone.id = clone.id + "_copy";
            }
            modifyClassList(event.currentTarget, 1);
            modifyClassList(clone, 2);
            event.target.appendChild(clone);
        }*/
    } catch (e) {
        console.error(e.message);
        //console.log('droppingElement', value);
    }   console.groupEnd();
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
        //console.log('overRemains', { length:overRemains.length });
        //console.dir(overRemains);
        for(var i= 0; i<overRemains.length; i++){
            /**
                не заменять i<overRemains.length на статическую переменную,
                т.к. состав коллекции обновляется динамически! */
            //console.log('item', overRemains.item(i));
            modifyClassList(overRemains[i], 1);
        }
    }
}


function showArgs(event){
    var args=[];
    for(var i= 0, j=arguments.length; i<j; i++){
        args.push(arguments[i]);
    }
    return args;
}

//
function modifyClassList(element, classNumber, add){
    if(!element){
        console.trace('no element');
    }
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