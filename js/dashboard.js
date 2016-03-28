window.onload = function(){
    manageData();
};

function dragStart(event){
        var elementCoords = event.target.getBoundingClientRect(),
            diffX = event.clientX-elementCoords.left,
            diffY = event.clientY-elementCoords.top;

    modifyClassList(event.currentTarget, 2, true);

    event.dataTransfer.setData("text", event.target.id+':'+event.target.dataset.element+':'+diffX+':'+diffY);
    event.effectAllowed = "copyMove";

}

function drag(event){
}

function dragOver(event){
    event.preventDefault();
    if(event.target.dataset['element']!="group-card-container")
        modifyClassList(event.currentTarget, 1, true);
}

function dragEnter(event){
}

function dragLeave(event){
    event.preventDefault();
    modifyClassList(event.currentTarget, 1);
}

function drop(event) {
    event.preventDefault();

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
        // определить нужное расположение перемещаемого объекта относительно пассивного
        directionX = (transferLeft>thisLeft)? 'right':'left',
        directionY = (transferTop>thisTop)? 'bottom':'top';
    try {
        var receiverElement = this,
            receiverParentNode = this.parentNode,
            applyCardRelocation = function(node, container, receiver, directionKey, directionValue){
                if(!node)           node = draggedElement;
                if(!container)      container=receiverParentNode;
                if(!receiver)       receiver=receiverElement;
                if(!directionKey)   directionKey = directionY;
                if(!directionValue) directionValue = 'bottom';
                //
                if(directionKey==directionValue){
                    // у текущего элемента есть сосед (следующий)
                    if(receiver.nextSibling){
                        // вставить между текущим и соседним
                        container.insertBefore(node, receiver.nextSibling);
                    }else{ // соседа нет, т.е., текущий -- последний в контейнере
                        // добавить в контейнер
                        container.appendChild(node);
                    }
                }else{ // со сдвигом вверх
                    container.insertBefore(node, receiver);
                }
            },
            // Переместить карточку внутри текущей группы или вызвать перемещение в другую
            setCardWithinGroup = function(receiver){
                if(receiverParentNode.id==draggedElement.parentNode.id){
                    if(receiverParentNode.querySelectorAll('[data-element="card"]').length==1){
                        return false;
                    }
                    // со сдвигом вниз
                    if(directionY=='bottom'){
                        // у текущего элемента есть сосед (следующий)
                        applyCardRelocation();
                    }else{ // со сдвигом вверх
                        receiverParentNode.insertBefore(draggedElement, receiver);
                    }
                }else{ // другая группа
                    // со сдвигом вниз
                    applyCardRelocation();
                }
            },
            // создать клон узла и назначить подходящий id
            getClone = function(container){
                var clone = draggedElement.cloneNode(true),
                    idToCheck = (draggedElement.id.indexOf("_")!=-1)?
                        getNativeDraggedElementId() :
                        draggedElement.id;
                clone.id=idToCheck+getIdSuffixHyphen(container);
                return clone;
            },
            // проверить наличие элемента внутри контейнера, чтобы выяснить, можно ли туда его перемещать
            checkElementInside = function(elementId, container){
                var element = document.getElementById(elementId);
                if(element){
                    if(container.contains(element)){
                        return true;
                    }
                }
                return false;
            },
            // извлечение стандартной подстроки для генерации id элемента
            getIdSuffixHyphen = function(container){
                return '_'+container.id.substr(container.id.lastIndexOf("-")+ 1);
            },
            // получить "исходный" (без суффикса) id элемента
            getNativeDraggedElementId = function(){
                return draggedElement.id.substring(0, draggedElement.id.indexOf("_"));
            },
            // проверить предположительно существующий клон элемента
            checkNoDraggedElementInContainer = function(container, nativeId){
                if(!nativeId) // prefix
                    nativeId =  getNativeDraggedElementId();
                var containerIdSuffix = getIdSuffixHyphen(container);
                return !checkElementInside(nativeId+containerIdSuffix, container);
            };

        switch (draggedElement.dataset.element) {
            // перемещаем группу
            case 'group':
                if( this.dataset.element==draggedElement.dataset.element &&
                    this.dataset.element=='group'){
                    applyCardRelocation(false, false, false, directionX, 'right');
                }
                break;
            // перемещаем категорию
            case 'category':
                if( this.dataset.element==draggedElement.dataset.element &&
                    this.dataset.element=='category'){
                    applyCardRelocation();
                }
                break;
            // перемещаем карточку
            case 'card':
                var isCategorized = draggedElement.id.indexOf("_")!=-1;
                switch (this.dataset.element) {
                    // на карточку
                    case 'card': // выяснить, что является контейнером
                        // на панель категорий
                        if(receiverParentNode.dataset.element=='panel-card-container'){
                            // карточка перемещается с другой панели или внутри панели
                            if(isCategorized){
                                // такого элемента в группе нет
                                if(!receiverParentNode.contains(draggedElement)){
                                    // проверить предположительно существующий клон элемента
                                    if(checkNoDraggedElementInContainer(receiverParentNode)){
                                        applyCardRelocation(getClone(receiverParentNode));
                                    }else{
                                        return false;
                                    }
                                }else{ // такой элемент в группе есть
                                    // только, если та же самая группа
                                    setCardWithinGroup(this);
                                }
                            }else{ // карточка перемещается из группы
                                // панель не содержит клона карточки
                                if(checkNoDraggedElementInContainer(receiverParentNode, draggedElement.id)){
                                    applyCardRelocation(getClone(receiverParentNode));
                                }else{
                                    return false;
                                }
                            }
                        }else // группа
                            if(receiverParentNode.dataset.element=='group-card-container'){

                                if(!isCategorized){
                                    // только, если та же самая группа
                                    setCardWithinGroup(this);
                                }
                        }
                        break;
                    case 'group-card-container':
                        if(!this.contains(draggedElement)){
                            if(isCategorized){
                                return false;
                            }
                            this.appendChild(draggedElement);
                        }else{
                            return false;
                        }
                        break;
                    case 'panel-card-container':
                        if(isCategorized){
                            // такого элемента в группе нет
                            if(!this.contains(draggedElement)){
                                // проверить клон
                                if(!checkNoDraggedElementInContainer(this)){ //receiverElement
                                    return false;
                                }
                            }else{
                                return false;
                            }
                        }else{ // карточка перемещается из группы
                            // панель содержит клон карточки, отменить всё
                            if(!checkNoDraggedElementInContainer(this, draggedElement.id)){
                                return false;
                            }
                        }
                        // добавить клон на панель категорий
                        this.appendChild(getClone(receiverParentNode));
                        break;
                    case 'category':
                        return false;
                        break;
                }
                break;

            default:
                return false;
        }
    } catch (e) {
        console.error(e.stack);
    }
}

function dragEnd(event){
    // Remove all of the drag data
    event.dataTransfer.clearData();
    /** • Тут нюанс. Отловить непосредственно элемент event.target.parentNode
     не всегда возможно */
    /** проверить блоки с неудалённым классом 'drag-over/start'.
     ситуация возникает, когда после события *over* не наступает
     событие *leave* для данного объекта, что происходит, если
     перемещаемый элемент не может быть на него сброшен. */
    var elements, suffix,
        removeClasses = function(classNm){
            suffix = (classNm==1)? 'over':'start';
            elements = document.getElementsByClassName('drag-'+suffix);
            if(elements.length){
                //
                for(var i= 0; i<elements.length; i++){
                    /**
                     не заменять i<elements.length на статическую переменную,
                     т.к. состав коллекции обновляется динамически! */
                    modifyClassList(elements[i], classNm);
                }
            }
        };
    removeClasses(1);
    removeClasses(2);
    // перестроить модель данных
    rebuildData();
}

// удалить динамически создаваемые классы
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
        if(func) {
            element.classList[func](className);
        }
    }
}
/**
 * Удалить копию задачи с нижней панели
 * @param element
 */
function removeIssueCopyFromPanel(element){
    console.log('Зарезервировано');
}