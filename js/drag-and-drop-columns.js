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
    // группы карточек по статусам, карточки между группами и панелями
    window.dragStore.setListeners('.column');
    window.dragStore.setListeners('.card');
    window.dragStore.setListeners('.cards-box', ['dragover', 'drop']);
    window.dragStore.setListeners('.box-panel', ['dragover', 'drop']);
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
            drop:       drop,
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
        setListeners: function (selector, events) {
            console.groupCollapsed('dragStore.setListeners', showArgs(arguments));
            var /**
                контейнер пар [событие: функциия], то, что будет передаваться
                в качестве параметров при установке наблюдателей */
                eventsHandler,
                // элементы, к которым будем присоединять наблюдателей:
                elements = document.querySelectorAll(selector);
                console.log('elements: ', elements);
            /**
             * Если набор событий не передан, извлекаем их (и функции) все,
               иначе ─ только переданные с параметром events */
            if (!events) {
                eventsHandler = eventsMap;
            } else { // если передаем, переформируем набор присоединяемых функций
                eventsHandler = {};
                console.groupCollapsed('form eventsHandler');
                events.forEach(function(ev){
                    eventsHandler[ev] = eventsMap[ev];
                    console.log('eventsHandler['+ev+']', eventsHandler[ev]);
                });
                console.groupEnd();
            }   console.log('eventsHandler', eventsHandler);
                console.groupCollapsed('%cset listeners', 'color: violet');
            for (var i = 0, j = elements.length; i < j; i++) {
                for (var event in eventsHandler) {
                    if (eventsHandler.hasOwnProperty(event)) {
                        console.log({ element: elements[i], event: event, method: eventsHandler[event] });
                        elements[i].addEventListener(event, eventsHandler[event], false);
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
    console.groupCollapsed('['+debugCnt+'] %cdragEnter', 'font-weight:normal; color: blue',{
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
    if(debugCnt==1) console.groupCollapsed('dragOver ['+debugCnt+'] %cgrouped', 'font-weight:normal; background-color:yellow');
}
/**
 * Предотвращает вызов события по умолчанию;
 * Назначает "эффект перетаскивания" для элемента
 * @param e ─ event
 * @returns {boolean}
 */
function dragOver(e) {
    console.groupCollapsed('['+debugCnt+'] %cdragOver', 'font-weight:normal; color:darkorange',{
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
    if(debugCnt==2||debugCnt==4) console.groupEnd();
    console.groupCollapsed('['+debugCnt+'] %cdragLeave', 'font-weight:normal; color: rgb(255,0,255)',{
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
        debugCnt=3;
        console.groupCollapsed('dragOver ['+debugCnt+'] %cgrouped', 'font-weight:normal; background-color:yellow');
    }
    if(debugCnt==4) {
        debugCnt=5;
        console.groupCollapsed('dragOver ['+debugCnt+'] %cgrouped', 'font-weight:normal; background-color:yellow');
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
        console.log({'this': this, '.moving': document.querySelector('.moving')});
    var targetAreaOver, targetAreaMoving;
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
function drop(e) {
    console.groupEnd();
    // clarify: Нельзя ли унифицировать?
    console.groupCollapsed('%cdrop', 'color:orange', {
        dataDropTarget: e.target.dataset.dropTarget,
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));
    //
    switch (e.target.dataset.dropTarget) {
        // переместить группу карточек (поменять местами колонку)
        case 'column':
            dropColumn(e, this);
            break;
        // переместить карточку в другую группу
        case 'card':
            dropCard(e, this);
            break;
        // скопировать карточку на одну из горизонтальных панелей
        case 'card-panel':
            dropCardPanel(e, this);
            break;
        default:
            alert('Неизвестный тип e.target.dataset.dropTarget: '+e.target.dataset.dropTarget);
    }
    console.log('%creturns false', 'color: navy');
    console.groupEnd();
    return false;
}
/**
 * Сбросить группу карточек
 * @param e ─ event
 * @param element ─ target-event
 */
function dropColumn(e, element){
    console.groupCollapsed('%сdropColumn', 'color:white; background-color: blue; padding:4px 10px', showArgs(arguments));
    var draggedElement = prepareToDrop(e);//dragStore.getDragElement();
    console.log({
        draggedElement: draggedElement, this: element/*,
         draggedElementParentId: draggedElement.parentNode.id,
         thisParentId: this.parentNode.id*/
    });
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (draggedElement != element) {
        // Set the source element HTML to the HTML of the element dropped on.
        draggedElement.innerHTML = element.innerHTML;
        console.log('set draggedElement.innerHTML as this.innerHTML: ', draggedElement.innerHTML);
        element.innerHTML = e.dataTransfer.getData('text/html');
        console.log('apply this.innerHTML from e.dataTransfer: ', element.innerHTML);
    }
    console.groupEnd();
}
/**
 * Сбросить карточку
 * @param e ─ event
 * @param element ─ target-event
 */
function dropCard(e, element) { // clarify: Нельзя ли унифицировать?
    console.groupCollapsed('%cdropCard', 'color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
    var draggedElement = prepareToDrop(e);
    console.log('draggedElement', draggedElement);
    console.groupEnd();
}
// копировать task на нижнюю панель
function dropCardPanel(e, element) {
    console.groupEnd();
    console.groupCollapsed('['+debugCnt+'] %cdropCardPanel', 'font-weight:normal;color:rebeccapurple', showArgs(arguments));
    var draggedElement = prepareToDrop(e),
        taskId = getTaskId(draggedElement),
        draggedElementPanel = dragStore.getDragElement(taskId),
        row = e.target, clone;
    console.log({ draggedElement:draggedElement, taskId:taskId, draggedElementPanel:draggedElementPanel, row:row });
    if(!draggedElementPanel || draggedElement.innerHTML != draggedElementPanel.innerHTML){
        clone = draggedElement.cloneNode(true);
        // удалить с клона класс-эффект
        handleClassMoving.call(clone, 'remove');
        console.log('clone: ', clone);
        //
        row.appendChild(clone);
        console.log('row after adding clone: ', row);
        dragStore.setDragElement(clone, taskId);
    }
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