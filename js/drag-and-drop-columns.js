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
    // ['dragstart', 'dragenter', 'dragover', 'dragleave'] ■
    // ['dragover', 'drop', 'dragend']
    window.dragStore.setListeners('.column, .card, .box-panel');
    //window.dragStore.setListeners('.card');
    //window.dragStore.setListeners('.cards-box');
    //window.dragStore.setListeners('.box-panel');
    console.log('%c======================================', 'color: rebeccapurple');
};
// тут будут закрома
function setupDragStore() {
    console.groupCollapsed('setupDragStore', showArgs(arguments));
    var drawnElement,
        drawnElementsPanel={},
        eventsMap = {
            dragstart:  dragStart,
            dragover:   dragOver,
            dragenter:  dragEnter,
            dragleave:  dragLeave,
            drop:       drop,
            dragend:    dragEnd
        };
    var setupData= {
        getDrawnElement: function (key) {
            console.group('dragStore.getDrawnElement', showArgs(arguments));
            var element = key? drawnElementsPanel[key] : drawnElement;
                console.log('element: ', element);
            console.groupEnd();
            return element;
        },
        // вызывается в dragStart
        setDrawnElement: function (element, key) {
            console.group('dragStore.setDrawnElement', showArgs(arguments));
            key ? /** сохранить перетащенный на нижнюю панель элемент
                    чтобы исключить дублирование (далее будет сверяться)
                    по id задачи */
                  drawnElementsPanel[key] = element
                  /**
                    сохранить последний перемещённый элемент; также
                    нужно для проверки -- исключить дублирование элементов
                    в колонках */
                : drawnElement = element;
                //--------------------debug
                var el=(key)?  drawnElementsPanel[key]:drawnElement;
                console.log('set element to: ', el);
                //--------------------debug end
            console.groupEnd();
        },
        // удалить из набора перетащенных на нижнюю панель задач текущую
        removeDrawnElementCopy: function(key){
            console.groupCollapsed('dragStore.removeDrawnElementCopy', showArgs(arguments));
            delete drawnElementsPanel[key];
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
    console.groupCollapsed('%chandleClassOver', 'font-weight:normal; color:goldenrod', showArgs(arguments));
    if(this.classList){
        console.log({ method: method, classList: this.classList });
        this.classList[method]('over');
        console.log('classList after removing: ', this.classList );
    }/*else{
        alert('No classList');
        console.log('%cNo classList', 'color:red', this);
    }*/
    console.groupEnd();
}
/**
 * Предотвращает "всплывание" события
 * Применяет к активному элементу вызвов функции назначения класса "moving"
 * Сохраняет перемещаемый элемент в приватной пер. drawnElement объекта dragStore
 * Назначает "эффект перетаскивания"
 * Определяет данные, которые будут перемещены из старого расположения в новое
 * @param e ─ event
 */
function dragStart(e) {
    debugCnt='dragStart';
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
    dragStore.setDrawnElement(this);
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
    if(debugCnt=='dragOver') console.groupEnd(); // свернуть предыдущую пачку dragOver
    debugCnt='dragEnter';

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
}
/**
 * Предотвращает вызов события по умолчанию;
 * Назначает "эффект перетаскивания" для элемента
 * @param e ─ event
 * @returns {boolean}
 */
function dragOver(e) {
    if(debugCnt!='dragOver') {
        debugCnt='dragOver';
        console.groupCollapsed('['+debugCnt+'] %cdragOver group', 'font-weight:normal; color:darkorange',{
            srcElement:arguments[0].srcElement,
            target:arguments[0].target,
            toElement:arguments[0].toElement
        }, showArgs(arguments));
    }
    console.groupCollapsed('['+debugCnt+'] %cdragOver', 'font-weight:normal; color:darkorange',{
        srcElement:arguments[0].srcElement,
        target:arguments[0].target,
        toElement:arguments[0].toElement
    }, showArgs(arguments));

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

        console.log({ e:e, 'e.dataTransfer':e.dataTransfer});
    console.groupEnd();
    return false;
}
/**
 * Применяет к пассивному элементу функцию удаления класса "over"
 * @param e ─ event
 */
function dragLeave(e) {
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dragLeave';

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
}
/**
 * Применяет к активному элементу функцию удаления класса "moving"
 * @param  e ─ event
 */
function dragEnd(e) {
    if(debugCnt=='dragOver') console.groupEnd();
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
 * @returns {*} ─ активный элемент, сохранённый в dragStore при инициализации перетаскивания
 */
function prepareToDrop(e) {
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='prepareToDrop';

    console.groupCollapsed('prepareToDrop', showArgs(arguments));
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    var drawnElement = dragStore.getDrawnElement();
        console.log('return: ', drawnElement);
    console.groupEnd();
    // получить последний сохранённый элемент
    return drawnElement;
}
/**
 * Универсальная функция, внутри ─ разводка по типам элементов
 * @param e
 * @returns {boolean}
 */
function drop(e) {
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='drop';
    // e.target ─ откуда
    var dropTarget = e.target.dataset.dropTarget,
        drawnElement = prepareToDrop(e);

    console.group('%cdrop', 'color:orange', {
        '0 e':e,
        '1 this': this,
        '2 dropTarget': dropTarget,
        '2 dropTarget2': this.dataset.dropTarget,
        '4 drawnElement': drawnElement
    }, showArgs(arguments));

    // Если перемещаем карточку, находящуюся в нижней панели
    if( drawnElement &&
        drawnElement.dataset.dropTarget &&
        drawnElement.dataset.dropTarget=='card-panel'
      ){
        dropCardRelocate.call(this, e, drawnElement);
        console.log('%creturns false', 'color: navy');
        console.groupEnd();
        return false;
    }

    var dropsMap = {
            'column':dropColumn,
            'card':dropCard,
            'card-panel':dropCardPanel
        },
        funcIndex=Object.keys(dropsMap).indexOf(dropTarget);

    if(funcIndex!=-1){
        dropsMap[dropTarget].call(this, e, drawnElement);
    }else {
        if(dropTarget=this.dataset.dropTarget){
            if(dropTarget=='card') {
                dropCardBack.call(this, e, drawnElement);
            }
        }else{
            document.querySelector('.issues').innerHTML='Неизвестный тип dropTarget: '+dropTarget;
        }
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
function dropColumn(e, drawnElement){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropColumn';

    console.groupCollapsed('%сdropColumn', 'color:white; background-color: blue; padding:4px 10px', showArgs(arguments));
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        // поменять местами контент элементов
        drawnElement.innerHTML = this.innerHTML;
        console.log('set drawnElement.innerHTML as this.innerHTML: ', drawnElement.innerHTML);
        this.innerHTML = e.dataTransfer.getData('text/html');
        console.log('apply this.innerHTML from e.dataTransfer: ', this.innerHTML);
    }
    console.groupEnd();
}
/**
 * Сбросить карточку в другую группу
 * @param e ─ event
 * @param element ─ target-event
 */
function dropCard(e, drawnElement) { // clarify: Нельзя ли унифицировать?
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCard';
    console.group('%cdropCard', 'font-weight:normal; color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
    console.log({ '1 e.target': e.target, '2 this':this, '3 drawnElement':drawnElement });
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        // добавить элемент в конец группы
        this.parentNode.appendChild(drawnElement);
    }
    console.groupEnd();
}
/**
 * Переместить элемент в группу, из которой извлекались карточки
 * @param e
 * @param drawnElement
 */
function dropCardBack(e, drawnElement){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCard';
    console.group('%cdropCard', 'font-weight:normal; color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        // добавить элемент в конец группы
        e.target.appendChild(drawnElement);
    }
    console.groupEnd();
}
/**
 * Переместить карточку на другую панель
 * @param e
 * @param drawnElement
 */
function dropCardRelocate(e, drawnElement){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCard';
    console.groupCollapsed('%cdropCardRelocate', 'color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
    console.log('drawnElement: ', drawnElement);
    // clarify: разобраться
    if (drawnElement != this) {
        // если сбрасываем на другую горизонтальную панель
        if(e.target.dataset.dropTarget&&e.target.dataset.dropTarget=='card-panel'){
            // добавить элемент в конец панели
            e.target.appendChild(drawnElement);
        }   //element.parentNode.appendChild(drawnElement);
    }
    console.groupEnd();
}
/**
 * копировать task на нижнюю панель
  */
function dropCardPanel(e, drawnElement) {
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCardPanel';
    console.groupCollapsed('['+debugCnt+'] %cdropCardPanel', 'color:rebeccapurple', showArgs(arguments));
    console.log('drawnElement', drawnElement);
    var taskId = getTaskId(drawnElement),
        drawnElementPanel = dragStore.getDrawnElement(taskId),
        row = e.target, clone;
    console.log({ drawnElement:drawnElement, taskId:taskId, drawnElementPanel:drawnElementPanel, row:row });
    if(!drawnElementPanel || drawnElement.innerHTML != drawnElementPanel.innerHTML){
        clone = drawnElement.cloneNode(true);
        // удалить с клона класс-эффект
        handleClassMoving.call(clone, 'remove');
        console.log('clone: ', clone);
        //
        row.appendChild(clone);
        console.log('row after adding clone: ', row);
        dragStore.setDrawnElement(clone, taskId);
    }
    console.groupEnd();
}
/**
 * Получить id задачи
 * @param element
 * @returns {string}
 */
function getTaskId(element){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='getTaskId';

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