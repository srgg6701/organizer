var classNameMoving='moving',
    classNameOver='over';

function handleDragStart(e) {
    this.classList.add(classNameMoving);
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
    setTimeout(function(){
        if(targetArea) targetArea.classList.remove(classNameOver);
    },200);
}
// выбрать все колонки
var cols = document.querySelectorAll('#columns .column');
for(var i= 0, j=cols.length; i<j; i++){
    cols[i].addEventListener('dragstart', handleDragStart, false);
    cols[i].addEventListener('dragover', handleDragOver, false);
    cols[i].addEventListener('dragenter', handleDragEnter, false);
    cols[i].addEventListener('dragleave', handleDragLeave, false);
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
