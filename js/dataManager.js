function getData() {
    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/data.json', true);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

function manageData() {
    var storedData,
        buildContents = function (data) {
            var contents = JSON.parse(data),
                groupHeader, categoryHeader,
                taskSet, categorySet,
                taskId, value, group, card, cardNodes, cards = {},
                cardContainer, cardClose, groupContainer, groupCardsContainer,
                sectionCards = document.getElementById('section-cards'),
                sectionCategories = document.getElementById('section-categories');

            console.groupCollapsed('getData');
            console.log('contents', contents);
            /*console.groupEnd();
             return false;*/

            // создать группу карточек
            //for (var cat in contents.tasks) {
            contents.tasks.forEach(function (taskGroup) { // => array[ object, object ]
                card = '';
                taskSet = taskGroup[0]; // => { header: [ {}, [] ] }
                groupHeader = Object.keys(taskSet)[0]; // "Not started", "Done" etc
                // taskSet[groupHeader] => [ 0:{ alias: alias, bg: background }, 1:[ taskId: taskText ] ]
                group = compileGroup(groupHeader, taskSet[groupHeader][0].alias);
                groupContainer = group[0];
                groupCardsContainer = group[1];
                //
                taskSet[groupHeader][1].forEach(function (currentTaskSet) {
                    taskId = Object.keys(currentTaskSet)[0];
                    value = currentTaskSet[taskId];
                    cardNodes = compileCard(taskId, taskSet[groupHeader][0].alias, value);
                    cardContainer = cardNodes[0];
                    cardClose = cardNodes[1];
                    cards[taskId] = [cardContainer.cloneNode(), document.createTextNode(value), cardClose.cloneNode()];
                    cardContainer.appendChild(cardClose);
                    groupCardsContainer.appendChild(cardContainer);
                });
                groupContainer.appendChild(groupCardsContainer);
                groupContainer.id = "group-" + taskSet[groupHeader][0].alias;
                groupContainer.style = 'background-color:' + taskSet[groupHeader][0].bg;
                sectionCards.appendChild(groupContainer);

            });
            // добавить панели категорий
            var panel, container, section, pos, nativeId;
            //for(var cat in contents.categories){
            contents.categories.forEach(function (category) { // => array[ object, object ] ]
                //console.log({cat:cat, contents:categorySet});
                card = '';
                categorySet = category[0]; // => { header: [ {}, [] ] }
                categoryHeader = Object.keys(categorySet)[0]; // "User experience" end so on
                // categorySet[categoryHeader] => [ 0:{ alias: alias, bg: background }, 1:[ taskId, taskId, ... ]
                panel = compileCategory(categorySet[categoryHeader][0].alias, categoryHeader, categorySet[categoryHeader][0].bg);
                //console.log('%ccategories', 'color:green', { cats: categorySet[1], cards:cards });
                container = panel[0];
                section = panel[1];
                categorySet[categoryHeader][1].forEach(function (objTaskId) {
                    card = cards[objTaskId];
                    pos = card[0].id.indexOf('_');
                    nativeId = (pos != -1) ?
                        card[0].id.substr(0, pos) : card[0].id;
                    card[0].id = nativeId + '_' + categorySet[categoryHeader][0].alias;
                    //console.log('card[0].id', card[0].id);
                    card[0].appendChild(card[1]);
                    card[0].appendChild(card[2]);
                    section.appendChild(card[0]);
                });
                container.appendChild(section);
                sectionCategories.appendChild(container);
            });

            console.groupEnd();

            var elements = document.querySelectorAll('[draggable="true"]');
            [].forEach.call(elements, function (item) { //console.log(item);
                item.addEventListener('dragstart', dragStart);
                item.addEventListener('drag', drag);
                item.addEventListener('dragend', dragEnd);
            });

            elements = document.querySelectorAll('[data-element]');
            [].forEach.call(elements, function (item) { //console.log(item);
                item.addEventListener('dragover', dragOver);
                item.addEventListener('dragenter', dragEnter);
                item.addEventListener('dragleave', dragLeave);
                item.addEventListener('drop', drop);
            });
        };
    //console.log('dragStore', window.dragStore);
    if (storedData = getStoredData()/* && 1>2*/) {
        //console.log('storedData', storedData);
        buildContents(storedData);
    } else {    console.log('no storedData');
        getData()
            .then(function (response) {
                buildContents(response);
            }, function (error) {
                console.warn(error)
            });
    }
}

function compileGroup(header, status) {
    console.groupCollapsed('compileGroup', header, status);
    var groupContainer = document.createElement('div'),
        groupHeader = document.createElement('header'),
        groupCardsContainer = document.createElement('div');
    groupContainer.draggable = "true";
    groupContainer.dataset['element'] = "group";
    groupContainer.className = "column";
    groupHeader.appendChild(document.createTextNode(header));
    groupContainer.appendChild(groupHeader);
    groupCardsContainer.dataset['element'] = "group-card-container";
    groupCardsContainer['data-group-status'] = status;
    console.groupEnd();
    return [groupContainer, groupCardsContainer];
}
function compileCard(id, status, contents) {
    var divContainer = document.createElement('div'),
        divClose = document.createElement('div');
    divContainer.id="task"+id;
    divContainer['data-task-status']=status;
    divContainer.dataset['element']="card";
    divContainer.draggable="true";
    divContainer.className="card";
    divContainer.appendChild(document.createTextNode(contents));
    divClose.className="remove";
    divClose['data-action']="remove-card-copy";
    divClose.addEventListener('click', removeIssueCopyFromPanel);
    return [divContainer, divClose];
}
function compileCategory(category_alias, categoryHeader, bg) {
    var container = document.createElement('div'),
        header = document.createElement('header'),
        section = document.createElement('section');
    container.id = "panel-container-" + name;
    container.draggable = "true";
    container.dataset['element'] = "category";
    container.className = "box-panel-container";
    header.appendChild(document.createTextNode('Category: ' + categoryHeader));
    container.appendChild(header);
    section.id = "box-rows-" + category_alias;
    section.dataset['element'] = "panel-card-container";
    section.className = "box-panel";
    section.style = 'background-color:' + bg;
    return [container, section];
}
// см. data.json
function rebuildData() {
    //console.log('rebuildData');
    // { ► open contents { tasks: [ [ { taskHeader: [ { alias: alias, bg: background }, [ { taskId: taskText }, {...}, {...} ] ] } ], [], [], ... ], categories: [  ]}
    var contents = {tasks: [], categories: []},
        groupTasksSet, currentTaskGroup, taskArray, cards,
        categorySet, currentCategory, categoryArray, attachedTasks,
        elements = document.querySelectorAll('#section-cards [data-element="group"]');
    // tasks: [ ► tasks array
    for (var i = 0, j = elements.length; i < j; i++) {
        currentTaskGroup = elements[i]; //console.group(tasksGroup.id);  console.dir(tasksGroup);
        // [ ► create an array for every task set ─ [{ header1: [array] }], [{ header2: [array] }] ...
        taskArray = contents.tasks[i] = [];
        // { ► create container for the current task set { header: [] }
        taskArray[0] = {};
        // "Not started": [ ► create an data array to store the current group "config" & data
        groupTasksSet = taskArray[0][currentTaskGroup.children[0].innerText] = [];
        // array's elements {alias:alias, bg:backgroundColor}, [task_id: task_text]
        // {  ► open task "config" block [0:{}]
        // alias: "new",
        // bg: "rgb(255, 140, 0)"
        groupTasksSet[0] = {  // the current task "config" block
            alias: currentTaskGroup.id.substr(currentTaskGroup.id.indexOf('-') + 1),
            bg: currentTaskGroup.style.backgroundColor
        };
        // }, ■ close task "config" block (Object)
        // [  ► create task id & text block [ { 1:text }, {...}, {...} ]
        groupTasksSet[1] = [];
        cards = currentTaskGroup.childNodes[1].childNodes;
        console.log('cards', cards);
        for (var ii = 0, jj = cards.length, task; ii < jj; ii++) {
            task = cards[ii];
            groupTasksSet[1][ii] = {};
            // {
            groupTasksSet[1][ii][task.id.substr(4)] = task.innerText;
            console.dir(groupTasksSet[1][ii][task.id.substr(4)])
            console.log('task content',
                {
                    text: groupTasksSet[1][ii][task.id.substr(4)],
                    children: groupTasksSet[1][ii][task.id.substr(4)].childNodes
                });
            //  "[card_id]": "Тут некая задача из тех, что назначены, но ещё не начаты"
            // },
            //{...}, {...}, {...}
            //console.group(card.id); //console.dir(card); //console.groupEnd();
        }   //console.groupEnd();
        // ] ■ close task id & text block (Array)
        // ] ■ close task contents block (Array)
        // } ■ close current task container (Object)
        // ] ■ close current task set (Array)
    }
    // ], ■ end of tasks array
    // } ■ end of "tasks" field
    elements = document.querySelectorAll('#section-categories [data-element="category"]');
    // categories: [ ► categories array
    for (i = 0, j = elements.length; i < j; i++) {
        currentCategory = elements[i];
        // [ ► create an array for every category set ─ [{ header1: [array] }], [{ header2: [array] }]
        categoryArray = contents.categories[i] = [];
        // { ► create container for the current category set { header: [] }
        categoryArray[0] = {};
        // "User experience": [ ► create an array to store the current category "config" & attached tasks set
        categorySet = categoryArray[0][currentCategory.children[0].innerText.substr(10)] = [];
        // array's elements {alias:alias, bg:backgroundColor}, [task_id, taks_id, ...]
        // {  ► open "category config block" [0:{}]
        // alias: "user_experience",
        // bg: "#5F9EA0"
        categorySet[0] = {// the current category "config" block
            alias: currentCategory.id.substr(currentCategory.id.lastIndexOf('-') + 1),
            bg: currentCategory.childNodes[1].style.backgroundColor
        };  //console.dir(cat.childNodes);
        // }, ■ close category "config" block (Object)
        // [  ► open attached tasks ids block [1,4,5, ...n]
        categorySet[1] = [];
        attachedTasks = currentCategory.childNodes[1].childNodes;
        for (ii = 0, jj = attachedTasks.length, task; ii < jj; ii++) {
            task = attachedTasks[ii];
            // 1, 3, 4, 6, ....n
            categorySet[1].push(task.id.substring(4, task.id.indexOf("_")));
        }
        // ] ■ close attached tasks ids block (Array)
        // ] ■ close category data block (Array)
        // } ■ close category contents block (Object)
        // ] ■ close category set array
    }
    // ] ■ end of categories array
    // } ■ end of "categories" field
    // } ■ close contents
    console.log('data', contents);
    storeData(contents);
}

function storeData(contents, dataName) {
    if (!dataName) dataName = "dashboard";
    localStorage.setItem(dataName, JSON.stringify(contents));
}

function getStoredData(dataName) {
    if (!dataName) dataName = "dashboard";
    return localStorage.getItem(dataName);
}
