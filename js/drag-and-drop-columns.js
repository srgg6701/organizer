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
    // Пора открывать лавочку, растоманы! ☺
    window.dragStore = dragStoreInit(); //console.log('dragStoreInit', window.dragStore);
    // установить наблюдателей для перемещаемых объектов:
    // группы карточек по статусам, карточки между группами и панелями
    // ['dragstart', 'dragenter', 'dragover', 'dragleave'] ■
    // ['dragover', 'drop', 'dragend']
    // выбираем все элементы, задействованные в перемещениях
    window.dragStore.setListeners('.column, .card, .box-panel');
    console.log('%c======================================', 'color: rebeccapurple');
};
// тут будут закрома
function dragStoreInit() {
    console.groupCollapsed('dragStoreInit', showArgs(arguments));
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
    /*if(debugCnt!='dragOver') {
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
    }, showArgs(arguments));*/
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
        /*console.log({ e:e, 'e.dataTransfer':e.dataTransfer});
    console.groupEnd();*/
    return false;
}
/**
 * Шлюз для обработки события drop,
 * внутри ─ разводка по процедурам с карточками
 * @param e
 * @returns {boolean}
 */
function drop(e) {
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='drop';
    // e.target ─ элемент, на котором возникло событие drop
    var dropTargetStart = e.target.dataset.dropTarget,
        // элемент-инициатор перемещения; содержит класс "moving"
        drawnElement = prepareToDrop(e),
        dropTargetEnd, dropTargetEndPanel;
    // исключить клонирование элементов
    if( e.target.id && drawnElement.id &&
        ( e.target.id==drawnElement.id ||
         /**
            Проверяется при перемещении карточки из группы на нижнюю панель.
            Сработает, если копия карточки сбрасываетя непосредственно на
            свой предыдущий клон. В противном случае требуется доп. проверка
            (см. в следующем блоке) */
          e.target.id==drawnElement.id+'_' )
      ) {
        console.log('drop, %creturn false', 'color: red', {
            '0 e.target.id': e.target.id,
            '1 drawnElement.id': drawnElement.id,
            '2 e.target': e.target,
            '3 drawnElement': drawnElement,
            '4 e': e,
            '5 this': this
        });
        return false;
    }else {
        console.log('%cblock 2', 'color: darkorange', {
            '1 this.dataset.dropTarget':this.dataset.dropTarget,
            '2 this.children':this.children
        });
        // проверить все элементы в контейнере
        if(dropTargetEndPanel=this.dataset.dropTarget=='card-panel'){
            for(var i= 0, j=this.children.length; i<j; i++){
                // если обнаружен клон, прерываем выполнение функции
                if(this.children[i].id==drawnElement.id+'_'){
                    return false;
                }
            }
        }
        dropTargetEnd = drawnElement.dataset.dropTarget;
    }

    console.group('%cdrop', 'color:orange', {
        '0 compare e.target & drawnElement':(e.target.id==drawnElement.id),
        '1 dropTargetStart [e]': dropTargetStart, //
        '2 dropTargetEnd [this]': dropTargetEnd,
        '3 deep comparison':{
            '1 drawnElement': drawnElement,
            '2 e.target':e.target,
            '3 innerHTML':(e.target.innerHTML==drawnElement.innerHTML),
            '4 outerHMTL':(e.target.outerHTML==drawnElement.outerHTML),
            '5 HTML':{
                '0 inner':{
                    '1 e.target': e.target.innerHTML,
                    '2 drawnElement': drawnElement.innerHTML
                },
                '1 outer':{
                    '1 e.target': e.target.outerHTML,
                    '2 drawnElement': drawnElement.outerHTML
                }
            }
        },
        '4 sources':{
            '1 e':e,
            '2 this': this
        }
    }, showArgs(arguments));

    // Меняем местами колонки
    if( dropTargetStart=='card' &&
        drawnElement.dataset.dropArea &&
        drawnElement.dataset.dropArea == 'column'
    ){
        dropColumnExchange.call(this, e, drawnElement);

        console.log('%creturns false', 'color: red'); console.groupEnd();
        return false;
    }
    // Перемещаем карточку на нижнюю панель
    if(dropTargetEndPanel){
        dropCardBottomPanelCopy.call(this, e, drawnElement);

        console.log('%creturns false', 'color: navy'); console.groupEnd();
        return false;
    }
    // Перемещаем карточку между нижними панелями
    if(dropTargetEnd=='card-panel'){
        dropCardBottomPanelRelocate.call(this, e, drawnElement);

        console.log('%creturns false', 'color: navy'); console.groupEnd();
        return false;
    }

    // карта вызываемых функций в остальных случаях
    var dropsMap = {
            'column':dropColumnExchange,
            'card':dropCardRelocate,
            'card-panel':dropCardBottomPanelCopy
        },
        funcIndex=Object.keys(dropsMap).indexOf(dropTargetStart);

    if(funcIndex!=-1){
        dropsMap[dropTargetStart].call(this, e, drawnElement);
    }else {
        if(dropTargetStart=this.dataset.dropTarget){
            if(dropTargetStart=='card') {
                dropCardRelocateBack.call(this, e, drawnElement);
            }
        }else{
            document.querySelector('.issues').innerHTML='Неизвестный тип dropTargetStart: '+dropTargetStart;
        }
    }
        console.log('%creturns false', 'color: navy');
    console.groupEnd();
    return false;
}
/**
 * Поменять местами группу карточек
 * @param e ─ event
 * @param drawnElement ─ target-event
 */
function dropColumnExchange(e, drawnElement){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropColumnExchange';

    console.groupCollapsed('%c dropColumnExchange', 'color:white; background-color: blue; padding:4px 10px', showArgs(arguments));
    console.log({
        '0 e': e,
        '1 drawnElement': drawnElement,
        '2 this': this
    });
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        var // найти нужную колонку, если влезли глубже, чем надо
            findColumn = function(toColumn, i){
                if(toColumn.dataset.dropArea &&
                    toColumn.dataset.dropArea=='column'){
                    return toColumn;
                }else{
                    if(i>=10){
                        alert('Группа карточек не найдена после '+i+' итераций');
                        console.warn('Последняя найденная колонка: ', toColumn);
                        return false;
                    }
                    i=(!i)? 1:i+1;
                    findColumn(toColumn.parentNode, i);
                }
            },
            toColumn=findColumn(this);
        // не повезло
        if(!toColumn) return false;
        // поменять местами контент элементов
        drawnElement.innerHTML = toColumn.innerHTML;
        console.log('set drawnElement.innerHTML as toColumn.innerHTML: ', drawnElement.innerHTML);
        toColumn.innerHTML = e.dataTransfer.getData('text/html');
        console.log('apply toColumn.innerHTML from e.dataTransfer: ', toColumn.innerHTML);
    }
    console.groupEnd();
}
/**
 * Переместить карточку в другую группу
 * @param e ─ event
 * @param drawnElement ─ target-event
 */
function dropCardRelocate(e, drawnElement) { // clarify: Нельзя ли унифицировать?
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCardRelocate';
    console.group('%c dropCardRelocate', 'font-weight:normal; color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
    console.log({ '1 e.target': e.target, '2 this':this, '3 drawnElement':drawnElement });
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (drawnElement != this) {
        e.target.parentNode.insertBefore(drawnElement, e.target);
        // добавить элемент в конец группы
        //this.parentNode.appendChild(drawnElement);
    }
    console.groupEnd();
}
/**
 * Переместить элемент в группу, из которой извлекались карточки
 * @param e
 * @param drawnElement
 */
function dropCardRelocateBack(e, drawnElement){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCardRelocate';
    console.group('%c dropCardRelocateBack', 'font-weight:normal; color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
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
function dropCardBottomPanelRelocate(e, drawnElement){
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCardRelocate';
    console.groupCollapsed('%c dropCardBottomPanelRelocate', 'color:white; background-color: #999; padding:4px 10px', showArgs(arguments));
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
 * копировать Карточку на нижнюю панель
 * @param e
 * @param drawnElement
 */
function dropCardBottomPanelCopy(e, drawnElement) {
    if(debugCnt=='dragOver') console.groupEnd();
    debugCnt='dropCardBottomPanelCopy';
    console.groupCollapsed('%c dropCardBottomPanelCopy', 'color:rebeccapurple', showArgs(arguments));
    var taskId = getTaskId(drawnElement),
        drawnElementPanel = dragStore.getDrawnElement(taskId),
        row= e.target, clone;
    /**
     если пытаемся засунуть карточку внутрь другой карточки,
     передвинем всё на уровень выше */
    if( e.target.dataset.dropTarget &&
        e.target.dataset.dropTarget=='card') {
        row = row.parentNode;
    }
    /**
     если пытались засунули ещё глубже -- внутрь блока с командой,
     удаляющей карточку, поднимемся выше на 2 уровня   */
    if( e.target.parentNode.dataset.dropTarget &&
        e.target.parentNode.dataset.dropTarget=='card'){
        row = row.parentNode.parentNode;
    }

        console.log({ drawnElement:drawnElement, taskId:taskId, drawnElementPanel:drawnElementPanel, row:row });
    clone = drawnElement.cloneNode(true);
    clone.id=clone.id+'_';
    // удалить с клона класс-эффект
    handleClassMoving.call(clone, 'remove');
    console.log('clone: ', clone);
    /** добавить в конец панели; да, можно сделать
        ещё красивше, но совершенству нет предела вообще */
    row.appendChild(clone);
    console.log('row after adding clone: ', row);
    dragStore.setDrawnElement(clone, taskId);
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
// - Мини-сервисы -
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