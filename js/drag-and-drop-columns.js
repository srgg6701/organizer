var classNameMoving='moving',
    classNameOver='over',
    dragSrcEl = null;

function handleDragStart(e) {
    this.classList.add(classNameMoving);
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
}
function handleDragEnter(e) {
    // добавить класс к блоку с посадочной площадкой
    this.classList.add(classNameOver);
}
function handleDragLeave(e) { console.log('handleDragLeave, this:', this);
    // удалить класс с перемещаемого блока
    this.classList.remove(classNameOver);
}
function handleDragEnd(e) { console.log('handleDragEnd, this:', this);
    this.classList.remove(classNameMoving);
    var targetArea=document.querySelector('.over');
    // задержка для красоты ☻
    setTimeout(function(){
        if(targetArea) targetArea.classList.remove(classNameOver);
    },200);
}
function handleDrop(e) {
    if (e.stopPropagation) { // предотвратить дальнейшее распространение
        e.stopPropagation();
    }
    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}
// выбрать все колонки
var cols = document.querySelectorAll('#columns .column');
for(var i= 0, j=cols.length; i<j; i++){
    cols[i].addEventListener('dragstart', handleDragStart, false);
    cols[i].addEventListener('dragover', handleDragOver, false);
    cols[i].addEventListener('dragenter', handleDragEnter, false);
    cols[i].addEventListener('dragleave', handleDragLeave, false);
    cols[i].addEventListener('drop', handleDrop, false);
    cols[i].addEventListener('dragend', handleDragEnd, false);
}
/*
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('dragend', handleDragEnd, false);
});*/
