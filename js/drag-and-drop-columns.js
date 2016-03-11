window.onload = function () {

    (window.setDragHandler = function () {
        // выбрать все колонки
        var cols = document.querySelectorAll('#box-columns .column'),
            events = {
                dragstart: dragStart,
                dragover: dragOver,
                dragenter: dragEnter,
                dragleave: dragLeave,
                drop: drop,
                dragend: dragEnd
            };
        for (var i = 0, j = cols.length; i < j; i++) {
            for (var event in events) {
                if (events.hasOwnProperty(event)) {
                    cols[i].addEventListener(event, events[event], false);
                }
            }
        }
    })();
    window.dragStore = setDragStore();
    console.log('setDragStore', setDragStore);
};
function setDragStore() {
    var draggedElement; // приватная переменная
    return {
        getDragElement: function () {
            return draggedElement;
        },
        setDragElement: function (element) {
            draggedElement = element;
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
function dragStart(e) {
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
    var targetArea;
    // задержка для красоты ☻
    setTimeout(function () {
        if (targetArea = document.querySelector('.over'))
            handleClassOver.call(targetArea, 'remove');
    }, 200);
}
function drop(e) {
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    var draggedElement = dragStore.getDragElement();
    console.log('drop', {
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
