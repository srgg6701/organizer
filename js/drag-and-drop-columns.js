var debugCnt;
function showArgs(){
    var args=[];
    for(var i= 0, j=arguments.length; i<j; i++){
        args.push(arguments[i]);
    }
    return args;
}
/**/
window.onload = function () {
    // солнце взошло, растоманы! Пора распространять урожай ☺
    window.dragStore = setupDragStore(); //console.log('setupDragStore', window.dragStore);
    // установить наблюдателей для перемещаемых объектов:
    // группы карточек по статусам
    window.dragStore.setListeners('.column', 'column');
    window.dragStore.setListeners('.task', 'issue');
    console.log('%c======================================', 'color: rebeccapurple');
};
// тут будут закрома
function setupDragStore() {
    console.groupCollapsed('setupDragStore', showArgs(arguments));
    var draggedElement,
        draggedElementsPanel={},
        eventsMap = { /**
            [события: глобальные функции], могут
            различаться для типов элементов т.о., в некоторых
            случаях значениями являются не имена функций, а объекты,
            где ключ -- тип набора передаваемых элементов, а значение --
            имя глобальной функции, присоединяемое к этому элементу с
            наблюдателем (listener'ом) */
            dragstart:  dragStart,
            dragover:   dragOver,
            dragenter:  dragEnter,
            dragleave:  dragLeave,
            drop:       { column: dropColumn, issue: dropIssue },
            dragend:    dragEnd
        }; // приватная переменная
    var setupData= {
        getDragElement: function (key) {
            console.group('dragStore.getDragElement', showArgs(arguments));
            //return key? draggedElementsPanel[key] : draggedElement;
            var element = key? draggedElementsPanel[key] : draggedElement;
                console.log('element: ', element);
            console.groupEnd();
            return element;
        },
        // вызывается в dragStart
        setDragElement: function (element, key) {
            console.group('dragStore.setDragElement', showArgs(arguments));
            key ? /** сохранить перетащенный на нижнюю панель элемент
                    чтобы исключить дублирование (далее будет сверяться)
                    по id задачи */
                  draggedElementsPanel[key] = element
                  /**
                    сохранить последний перемещённый элемент; также
                    нужно для проверки -- исключить дублирование элементов
                    в колонках */
                : draggedElement = element;
                //--------------------debug
                var el=(key)?  draggedElementsPanel[key]:draggedElement;
                console.log('set element to: ', el);
                //--------------------debug end
            console.groupEnd();
        },
        // удалить из набора перетащенных на нижнюю панель задач текущую
        removeDraggedElementPanel: function(key){
            console.groupCollapsed('dragStore.removeDraggedElementPanel', showArgs(arguments));
            delete draggedElementsPanel[key];
            console.groupEnd();
        },
        setListeners: function (selector, elementsKey, events) {
            console.groupCollapsed('dragStore.setListeners', showArgs(arguments));
            var /**
                контейнер пар [событие: функциия], то, что будет передаваться
                в качестве параметров при установке наблюдателей */
                eventsSet,
                // элементы, к которым будем присоединять наблюдателей:
                elements = document.querySelectorAll(selector);
                console.log('elements: ', elements);
            /**
             * Если набор событий не передан, извлекаем их (и функции) все */
            if (!events) {
                eventsSet = eventsMap;
            } else { // если передаем, переформируем набор присоединяемых функций
                eventsSet = {};
                console.groupCollapsed('form eventsSet');
                eventsMap.forEach(function (key) {
                    eventsSet[key] = eventsMap[key];
                    console.log('eventsSet['+key+']', eventsSet[key]);
                });
                console.groupEnd();
            }   console.log('eventsSet', eventsSet);
                console.groupCollapsed('%cset listeners', 'color: violet');
            for (var i = 0, j = elements.length, method; i < j; i++) {
                for (var event in eventsSet) {
                    if (eventsSet.hasOwnProperty(event)) {
                        method = (typeof eventsSet[event] == 'object')?
                            eventsSet[event][elementsKey] : eventsSet[event];
                        console.log({ element: elements[i], event: event, method: method });
                        elements[i].addEventListener(event, method, false);
                    }
                }
            }
                console.groupEnd();
            console.groupEnd();
        }
    };  console.log('return %csetupData ', 'color:green',setupData);
    console.groupEnd();
    return setupData;
}

/**
 * Добавить/удалить класс перемещаемого объекта
 * @param method
 */
function handleClassMoving(method) {
    console.groupCollapsed('%chandleClassMoving', 'font-weight:normal; color:orange', showArgs(arguments));
        console.log({ method: method, classList: this.classList });
    this.classList[method]('moving');
        console.log('classList after removing: ', this.classList );
    console.groupEnd();
}
/**
 * Добавить/удалить класс для объекта, НАД которым перемещаем
 * @param method
 */
function handleClassOver(method) {
    console.groupCollapsed('handleClassOver', 'font-weight:normal; color:goldenrod', showArgs(arguments));
        console.log({ method: method, classList: this.classList });
    this.classList[method]('over');
        console.log('classList after removing: ', this.classList );
    console.groupEnd();
}
/**
 * Предотвращает "всплывание" события
 * Применяет к активному элементу вызвов функции назначения класса "moving"
 * Сохраняет перемещаемый элемент в приватной пер. draggedElement объекта dragStore
 * Назначает "эффект перетаскивания"
 * Определяет данные, которые будут перемещены из старого расположения в новое
 * @param e ─ event
 */
function dragStart(e) {
    debugCnt=1;
    console.groupCollapsed('%cdragStart', 'background-color:rgb(180,180,255); padding:4px 10px',{
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    handleClassMoving.call(this, 'add');
    // сохранить текущий активный элемент для обработки при следующих событиях
    dragStore.setDragElement(this);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
        console.log('e.dataTransfer',  e.dataTransfer);
    console.groupEnd();
}
/**
 * Применяется к ПАССИВНОМУ элементу, в область над которым
 * входит перетаскиваемый элемент;
 * В настоящий момент ─ только назначает класс "over"
 * @param e ─ event
 */
function dragEnter(e) {
    if(debugCnt==2) console.groupEnd(); // свернуть предыдущую пачку dragOver
    console.groupCollapsed('%cdragEnter', 'font-weight:normal; color: blue',{
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    handleClassOver.call(this, 'add');
        console.log('this: ', this);
    console.groupEnd();
    if(debugCnt==1) console.groupCollapsed('dragOver %cgrouped', 'font-weight:normal; background-color:yellow');
}
/**
 * Предотвращает вызов события по умолчанию;
 * Назначает "эффект перетаскивания" для элемента
 * @param e ─ event
 * @returns {boolean}
 */
function dragOver(e) {
    console.groupCollapsed('%cdragOver', 'font-weight:normal; color:darkorange',{
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
        console.log({ e:e, 'e.dataTransfer':e.dataTransfer});
    console.groupEnd();
    if(debugCnt==1) debugCnt=2;
    if(debugCnt==3) debugCnt=4;
    return false;
}
/**
 * Применяет к пассивному элементу функцию удаления класса "over"
 * @param e ─ event
 */
function dragLeave(e) {
    console.groupCollapsed('%cdragLeave', 'font-weight:normal; color: rgb(255,0,255)',{
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    handleClassOver.call(this, 'remove');
        console.log('this:', this);
    console.groupEnd();
    if(debugCnt==2) {
        console.groupCollapsed('dragOver %cgrouped', 'font-weight:normal; background-color:yellow');
        debugCnt=3;
    }
    if(debugCnt==4) {
        console.groupEnd();
        debugCnt=5;
        console.groupCollapsed('dragOver %cgrouped', 'font-weight:normal; background-color:yellow');
    }
}
/**
 * Применяет к активному элементу функцию удаления класса "moving"
 * @param  e ─ event
 */
function dragEnd(e) {
    console.groupCollapsed('%cdragEnd', 'background-color: #333; color: white; padding:4px 10px',{
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    handleClassMoving.call(this, 'remove');
        console.log('this:', this);
    var targetAreaOver, targetAreaMoving;
    // clarify: разобраться, почуму без этого карточки не перемещаются в нижний блок!
    if (targetAreaMoving = document.querySelector('.moving')){
        handleClassMoving.call(targetAreaMoving, 'remove');
    }
    // задержка для красоты ☻
    setTimeout(function () {
        if (targetAreaOver = document.querySelector('.over'))
            handleClassOver.call(targetAreaOver, 'remove');
    }, 200);
    console.groupEnd();
    console.log('%c*******************************************************', 'color: orange');
    debugCnt=null;
}
/**
 * Выполнить стандартные действия перед "сбрасыванием" элемента
 * @param e
 * @returns {*}
 */
function prepareToDrop(e) {
    console.groupCollapsed('handleClassOver', showArgs(arguments));
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }   console.log('return: ', dragStore.getDragElement());
    console.groupEnd();
    // получить последний сохранённый элемент
    return dragStore.getDragElement();
}
/**
 * Если перемещаем карточку, а не группу
 * @param e
 * @returns {boolean}
 */
function dropColumn(e) {
    console.groupEnd();
    // clarify: Нельзя ли унифицировать?
    console.groupCollapsed('%сdropColumn', 'color:orange', showArgs(arguments));
    /*if (e.stopPropagation) { // предотвратить дальнейшее распространение
     e.stopPropagation();
     }*/
    var draggedElement = prepareToDrop(e);//dragStore.getDragElement();
    console.log({
        draggedElement: draggedElement, this: this/*,
        draggedElementParentId: draggedElement.parentNode.id,
        thisParentId: this.parentNode.id*/
    });
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (draggedElement != this) {
        // если перетаскиваем вертикальные блоки (задачи по статусам)
        /*if(draggedElement.classList.contains('column')){
         if(draggedElement.parentNode.id!=this.parentNode.id)
         return false;
         }*/
        // Set the source element HTML to the HTML of the element dropped on.
        draggedElement.innerHTML = this.innerHTML;
        console.log('set draggedElement.innerHTML as this.innerHTML: ', draggedElement.innerHTML);
        this.innerHTML = e.dataTransfer.getData('text/html');
        console.log('apply this.innerHTML from e.dataTransfer: ', this.innerHTML);
    }   console.log('%creturns false', 'color: navy');
    console.groupEnd();
    return false;
}
/**
 * Сбросить карточку
 * @param e
 */
function dropIssue(e) { // clarify: Нельзя ли унифицировать?
    console.groupEnd();
    console.groupCollapsed('%cdropIssue', 'color:orange', showArgs(arguments));
    var draggedElement = prepareToDrop(e);
    console.log('draggedElement', draggedElement);
    console.groupEnd();
}
/**
 * Получить id задачи
 * @param element
 * @returns {string}
 */
function getTaskId(element){
    console.groupCollapsed('%cgetTaskId', 'color:blue', showArgs(arguments));
    console.log('return: ', element.id.substr(4));
    console.groupEnd();
    return element.id.substr(4);
}
// копировать task на нижнюю панель
function dropOnRow(e) {
    console.groupEnd();
    console.groupCollapsed('%cdropOnRow', 'font-weight:normal;color:rebeccapurple',{
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));
    var draggedElement = prepareToDrop(e),
        taskId = getTaskId(draggedElement),
        draggedElementPanel = dragStore.getDragElement(taskId),
        row = e.target, clone;
    console.log({ draggedElement:draggedElement, taskId:taskId, draggedElementPanel:draggedElementPanel, row:row });
    if(!draggedElementPanel || draggedElement.innerHTML != draggedElementPanel.innerHTML){
        clone = draggedElement.cloneNode(true);
        console.log('clone: ', clone);
        //
        row.appendChild(clone);
        console.log('row after adding clone: ', row);
        dragStore.setDragElement(clone, taskId);
    }
    console.groupEnd();
}
/**
 * Удалить копию задачи с нижней панели
 * @param element
 */
function removeIssueCopyFromPanel(element){
    // clarify: Не нужно ли (и возможно ли?) добавить наблюдателей в цикле, убрав из тегов? И что с angular-подходом тогда?
    console.groupCollapsed('%cremoveIssueCopyFromPanel', 'color:darkred', showArgs(arguments));
    var card=element.parentNode,
        taskId = getTaskId(card),
        draggedElementPanel = dragStore.getDragElement(taskId);
    console.log({ card:card, taskId:taskId, draggedElementPanel:draggedElementPanel });
    /** удалить ранее сохранённый элемент, чтобы не блокировал
    повторное копирование данных */
    if(draggedElementPanel&&draggedElementPanel.innerHTML==card.innerHTML){
        dragStore.removeDraggedElementPanel(taskId);
    }
    console.log('remove card', { cardParentNode: card.parentNode, card: card});
    card.parentNode.removeChild(card);
    console.groupEnd();
}