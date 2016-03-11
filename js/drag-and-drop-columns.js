window.onload = function () {
    // солнце взошло, растоманы! ☺
    window.dragStore = setupDragStore();
    //console.log('setupDragStore', window.dragStore);

    (window.setDragHandler = function (selector) {
        if (!selector) selector = '.column';
        // выбрать все блоки с карточками
        var dragSet = document.querySelectorAll(selector),
            events = dragStore.events; // извлечь события и имена методов
        console.log('dragSet', dragSet);
        // назначить слушателей событий
        for (var i = 0, j = dragSet.length; i < j; i++) {
            for (var event in events) {
                if (events.hasOwnProperty(event)) {
                    dragSet[i].addEventListener(event, events[event], false);
                }
            }
        }
    })();
};
function setupDragStore() {
    var draggedElement; // приватная переменная
    return {
        getDragElement: function () {
            return draggedElement;
        },
        // вызывается в dragStart
        setDragElement: function (element) {
            draggedElement = element;
        },
        events: { // события: глобальные функции
            dragstart: dragStart,
            dragover: dragOver,
            dragenter: dragEnter,
            dragleave: dragLeave,
            drop: dropColumn,
            dragend: dragEnd
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
function dragStart(e) { console.log('e: ', e);
    handleClassMoving.call(this, 'add');
    dragStore.setDragElement(this);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}
function dragEnter(e) {
    // добавить класс к блоку с посадочной площадкой
    handleClassOver.call(this, 'add');
}
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
function initDropping(e){
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
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
function dropIssue(e){
    var draggedElement = initDropping(e);
}
function dropOnRow(event){
    var draggedElement = initDropping(event),//dragStore.getDragElement().cloneNode(true),
        row = event.target;
    console.log('dropRow', {draggedElement: draggedElement, row: row});
    //
    row.appendChild(draggedElement);
}
