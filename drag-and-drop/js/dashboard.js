window.onload = function(){
    console.log('dashboard works');
    document.onmouseup=function(event){
        console.log('coordinates', {
            clientX:event.clientX,
            clientY:event.clientY
        });
    };
    manageData();
};

function dragStart(event){
    console.groupCollapsed('dragStart');
        var elementCoords = event.target.getBoundingClientRect(),
            diffX = event.clientX-elementCoords.left,
            diffY = event.clientY-elementCoords.top;
        console.log('event.target', {
            currentTarget:event.currentTarget,
            event: event,
            coordinates: {
                element:elementCoords,
                mouse:{
                    x: event.clientX,
                    y: event.clientY
                },
                diff:{
                    x:diffX,
                    y:diffY
                }
            }
        });

    //Hello there, <strong>stranger</strong>
    modifyClassList(event.currentTarget, 2, true);
    //event.dataTransfer.setData("text/html", event.target.outerHTML);
    event.dataTransfer.setData("text", event.target.id+':'+event.target.dataset.element+':'+diffX+':'+diffY);
    event.effectAllowed = "copyMove";
    console.groupEnd();
}

function drag(event){
    /*event.preventDefault();
    if(this.dataset.element&&this.dataset.element=='card')
        console.log('drag', { event:event, this:this});*/
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

    var transferData=event.dataTransfer.getData("text").split(':'),
        // извлечь сохранённый перемещаемый элемент
        draggedElement = document.getElementById(transferData[0]),
        // рассчитать координаты "перемещаемого" объекта
        transferLeft=event.clientX-transferData[2],
        transferTop=event.clientY-transferData[3],
        // координаты "принимающего" объекта
        thisCoordinates = this.getBoundingClientRect(),
        thisLeft=thisCoordinates.left,
        thisTop=thisCoordinates.top,
        directionX = (transferLeft>thisLeft)? 'right':'left',
        directionY = (transferTop>thisTop)? 'bottom':'top';
        console.log('draggedElement:', draggedElement, '\nreceiver:', this, '\ndirection: ' + directionX+':'+directionY); /*console.log({
                '0 transferElementType': transferData[1],
                '1 transferLeft': thisLeft,
                '2 transferTop': transferTop,
                '3 receiverLeft':thisLeft,
                '4 receiverTop':thisTop
        });*/
    try {
        var clone,
            receiverCard = this,
            applyCardRelocation = function(node){
                if(!node) node = draggedElement;
                if(directionY=='bottom'){
                    // у текущего элемента есть сосед (следующий)
                    if(receiverCard.nextSibling){
                        // вставить между текущим и соседним
                        console.log('Вставить между текущим и соседним');
                        receiverCardParentGroup.insertBefore(node, receiverCard.nextSibling);
                    }else{ // соседа нет, т.е., текущий -- последний в контейнере
                        // добавить в контейнер
                        console.log('Добавить в контейнер');
                        receiverCardParentGroup.appendChild(node);
                    }
                }else{ // со сдвигом вверх
                    console.log('Вставить перед текущим');
                    receiverCardParentGroup.insertBefore(node, receiverCard);
                }
            },
            setCardToGroup = function(receiver){
                if(receiverCardParentGroup.id==draggedElement.parentNode.id){
                    if(receiverCardParentGroup.querySelectorAll('[data-element="card"]').length==1){
                        console.log('%cГруппа содержит только перемещаемую карточку', 'background-color: #ddd');
                        console.groupEnd();
                        return false;
                    }
                    console.log('%cИзменить позицию в группе', 'color:rebeccapurple');
                    // со сдвигом вниз
                    if(directionY=='bottom'){
                        // у текущего элемента есть сосед (следующий)
                        applyCardRelocation();
                    }else{ // со сдвигом вверх
                        console.log('Вставить перед текущим');
                        receiverCardParentGroup.insertBefore(draggedElement, receiver);
                    }
                }else{ // другая группа
                    console.log('%cПереместить в другую группу', 'color:orange');
                    // со сдвигом вниз
                    applyCardRelocation();
                }
            },
            handleClone = function(){
                clone = draggedElement.cloneNode(true);
                clone.id=idToCheck;
                applyCardRelocation(clone);
            };

        switch (draggedElement.dataset.element) {
            // перемещаем группу
            case 'group':

                break;
            // перемещаем категорию
            case 'category':

                break;
            // перемещаем карточку
            case 'card':
                switch (this.dataset.element) {
                    // на карточку
                    case 'card': // выяснить, что является контейнером
                        var receiverCardParentGroup = this.parentNode,
                            elementToCheck, idToCheck,
                            categorized = draggedElement.id.indexOf("_")!=-1;
                        console.group('%cРасположить перед/после карточки', 'color:blue');
                        if(receiverCardParentGroup.dataset.element=='panel-card-container'){ // на панель категорий
                            console.log('%cНа панель категорий', 'color:violet');
                            // карточка перемещается с другой панели или внутри панели
                            var panelIdSuffix = '_'+receiverCardParentGroup.id.substr(receiverCardParentGroup.id.lastIndexOf("-")+ 1);//categoryIdSuffix
                            if(categorized){
                                // такого элемента в группе нет
                                if(!receiverCardParentGroup.contains(draggedElement)){
                                    // проверить клон элемента
                                    var nativeId = draggedElement.id.substring(0, draggedElement.id.indexOf("_"));
                                    idToCheck = nativeId + panelIdSuffix;
                                    // проверить предположительно существующий клон элемента
                                    if(elementToCheck = document.getElementById(idToCheck)){
                                        if(receiverCardParentGroup.contains(elementToCheck)){
                                            console.log('%cПанель уже содержит клон элемента', 'color:orangered');
                                            console.groupEnd();
                                            return false;
                                        }
                                    }
                                    console.log('%cДобавить в группу как клон', 'color:green');
                                    handleClone();
                                }else{ // такой элемент в группе есть
                                    // та же самая группа
                                    setCardToGroup(this);
                                }
                            }else{ // карточка перемещается из группы
                                idToCheck = draggedElement.id + panelIdSuffix;
                                elementToCheck = document.getElementById(idToCheck);
                                // панель не содержит клона карточки
                                if(!receiverCardParentGroup.contains(elementToCheck)){
                                    handleClone();
                                }else{
                                    console.log('Элемент уже содержится в этой группе');
                                    console.groupEnd();
                                    return false;
                                }
                            }
                        }else // группа
                            if(receiverCardParentGroup.dataset.element=='group-card-container'){
                                // та же самая группа
                                setCardToGroup(this);
                        }
                        console.groupEnd();
                        break;
                    case 'group-card-container':
                        if(!this.contains(draggedElement)){
                            console.log('%cДобавить в группу', 'color:green');
                            this.appendChild(draggedElement);
                        }else{
                            console.log('Элемент уже содержится в этой группе');
                            console.groupEnd();
                            return false;
                        }
                        break;
                    case 'panel-card-container':
                        break;
                }
                break; //group-card-container

            default:
                console.log('%cНичего не делать', 'background-color: #ddd');
                console.groupEnd();
                return false;
        }

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
    console.group('dragEnd');
        console.log('event.target', event.target);
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
    console.groupEnd();
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