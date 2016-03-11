window.onload = function () {
    // солнце взошло, растоманы! Пора распространять урожай ☺
    window.dragStore = setupDragStore(); //console.log('setupDragStore', window.dragStore);
    // установить наблюдателей для перемещаемых объектов:
    // группы карточек по статусам
    window.dragStore.setListeners('.column', 'column');
    window.dragStore.setListeners('.task', 'issue');
};
// тут будут закрома
function setupDragStore() {
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
    return {
        getDragElement: function (key) {
            return key? draggedElementsPanel[key] : draggedElement;
        },
        // вызывается в dragStart
        setDragElement: function (element, key) {
            key ? /** сохранить перетащенный на нижнюю панель элемент
                    чтобы исключить дублирование (далее будет сверяться)
                    по id задачи */
                  draggedElementsPanel[key] = element
                  /**
                    сохранить последний перемещённый элемент; также
                    нужно для проверки -- исключить дублирование элементов
                    в колонках */
                : draggedElement = element;
        },
        // удалить из набора перетащенных на нижнюю панель задач текущую
        removeDraggedElementPanel: function(key){
            delete draggedElementsPanel[key];
        },
        setListeners: function (selector, elementsKey, events) {
            var /**
                контейнер пар [событие: функциия], то, что будет передаваться
                в качестве параметров при установке наблюдателей */
                eventsSet,
                // элементы, к которым будем присоединять наблюдателей:
                elements = document.querySelectorAll(selector);
            /**
             * Если набор событий не передан, извлекаем их (и функции) все */
            if (!events) {
                eventsSet = eventsMap;
            } else { // если передаем, переформируем набор присоединяемых функций
                eventsSet = {};
                eventsMap.forEach(function (key) {
                    eventsSet[key] = eventsMap[key];
                });
            }
            /*console.log('setListeners', {
                selector:selector,
                eventsSet:eventsSet, elements:elements
            });*/
            for (var i = 0, j = elements.length, method; i < j; i++) {
                for (var event in eventsSet) {
                    if (eventsSet.hasOwnProperty(event)) {
                        method = (typeof eventsSet[event] == 'object')?
                            eventsSet[event][elementsKey] : eventsSet[event];
                        elements[i].addEventListener(event, method, false);
                    }
                }
            }
        }
    }
}

/**
 * Добавить/удалить класс перемещаемого объекта
 * @param method
 */
function handleClassMoving(method) {
    this.classList[method]('moving');
}
/**
 * Добавить/удалить класс для объекта, НАД которым перемещаем
 * @param method
 */
function handleClassOver(method) {
    this.classList[method]('over');
}
// универсальная(?)
function dragStart(e) {
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    /*var draggedPrevClass = dragStore.getDragElement();
    if(draggedPrevClass){
        if(draggedPrevClass.classList.length && draggedPrevClass.classList.contains('task')){
            if(this.classList.contains('column')) {
                console.log('.column after .task, break', {
                    draggedPrevClass:draggedPrevClass,
                    this:this.classList
                });
                return false;
            }
        }
    }*/
    handleClassMoving.call(this, 'add');
    // сохранить текущий активный элемент для обработки при следующих событиях
    dragStore.setDragElement(this);

    console.log('this, saved', this, dragStore.getDragElement());

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
// универсальная(?)
function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}
// универсальная(?)
function dragEnter(e) {
    // добавить класс к блоку с посадочной площадкой
    handleClassOver.call(this, 'add');
}
// универсальная(?)
function dragLeave(e) { //console.log('dragLeave, this:', this);
    // удалить класс с перемещаемого блока
    handleClassOver.call(this, 'remove');
}
function dragEnd(e) { //console.log('dragEnd, this:', this);
    handleClassMoving.call(this, 'remove');
    var targetAreaOver, targetAreaMoving;
    if (targetAreaMoving = document.querySelector('.moving'))
        handleClassMoving.call(targetAreaMoving, 'remove');
    // задержка для красоты ☻
    setTimeout(function () {
        if (targetAreaOver = document.querySelector('.over'))
            handleClassOver.call(targetAreaOver, 'remove');
    }, 200);
}
function initDropping(e) {
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    // получить последний сохранённый элемент
    return dragStore.getDragElement();
}
function dropColumn(e) {
    /*if (e.stopPropagation) { // предотвратить дальнейшее распространение
     e.stopPropagation();
     }*/
    var draggedElement = initDropping(e);//dragStore.getDragElement();

    console.log('dropColumn', {
        draggedElement: draggedElement, this: this,
        draggedElementParentId: draggedElement.parentNode.id,
        thisParentId: this.parentNode.id
    });
    // Если собираемся сбрасывать не туда же, откуда пришли
    if (draggedElement != this) {
        // если перетаскиваем вертикальные блоки (задачи по статусам)
        /*if(draggedElement.classList.contains('column')){
         if(draggedElement.parentNode.id!=this.parentNode.id)
         return false;
         }*/
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        draggedElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}
function dropIssue(e) {
    var draggedElement = initDropping(e);
    console.log('dropIssue', {e: e, draggedElement:draggedElement});
}
function getTaskId(element){
    return element.id.substr(4);
}
// копировать task на нижнюю панель
function dropOnRow(e) {
    var draggedElement = initDropping(e),
        taskId = getTaskId(draggedElement),
        draggedElementPanel = dragStore.getDragElement(taskId),
        row = e.target, clone;
    if(!draggedElementPanel || draggedElement.innerHTML != draggedElementPanel.innerHTML){
        clone = draggedElement.cloneNode(true);
        //
        row.appendChild(clone);
        dragStore.setDragElement(clone, taskId);
    }
}
function removeIssue(element){
    var card=element.parentNode,
        taskId = getTaskId(card),
        draggedElementPanel = dragStore.getDragElement(taskId);
    /** удалить ранее сохранённый элемент, чтобы не блокировал
    повторное копирование данных */
    if(draggedElementPanel&&draggedElementPanel.innerHTML==card.innerHTML){
        dragStore.removeDraggedElementPanel(taskId);
    }
    card.parentNode.removeChild(card);
}