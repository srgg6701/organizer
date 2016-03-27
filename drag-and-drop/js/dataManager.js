function getData(){
    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/data.json', true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

function manageData(){
    getData()
        .then(function(response) {
            var contents = JSON.parse(response),
                taskId, value, group, card, cardNodes, cards={},
                sectionCards = document.getElementById('section-cards'),
                sectionCategories = document.getElementById('section-categories');
            console.groupCollapsed('getData');
            // создать группу карточек
            var cardContainer, cardClose, groupContainer, groupCardsContainer;
            for (var cat in contents.tasks) {
                card = '';
                group = compileGroup(cat, contents.tasks[cat][0].alias);
                groupContainer = group[0];
                groupCardsContainer = group[1];
                //
                contents.tasks[cat][1].forEach(function (category) {
                    taskId = Object.keys(category)[0];
                    value = category[taskId];
                    cardNodes = compileCard(taskId, contents.tasks[cat][0].alias, value);
                    cardContainer = cardNodes[0];
                    cardClose = cardNodes[1];
                    cards[taskId]=[cardContainer.cloneNode(), document.createTextNode(value), cardClose.cloneNode()];
                    cardContainer.appendChild(cardClose);
                    groupCardsContainer.appendChild(cardContainer);
                });
                groupContainer.appendChild(groupCardsContainer);
                groupContainer.id="group-"+contents.tasks[cat][0].alias;
                groupContainer.style='background-color:'+contents.tasks[cat][0].bg;
                sectionCards.appendChild(groupContainer);

            }
            // добавить панели категорий
            var panel, container, section, pos, nativeId;
            for(var cat in contents.categories){
                //console.log({cat:cat, contents:contents.categories[cat]});
                card='';
                panel = compileCategory(contents.categories[cat][0].alias, cat, contents.categories[cat][0].bg);
                //console.log('%ccategories', 'color:green', { cats: contents.categories[cat][1], cards:cards });
                container = panel[0];
                section = panel[1];
                contents.categories[cat][1].forEach(function (objTaskId){
                    card=cards[objTaskId];
                    pos=card[0].id.indexOf('_');
                    nativeId=(pos!=-1)?
                        card[0].id.substr(0,pos):card[0].id;
                    card[0].id=nativeId+'_'+contents.categories[cat][0].alias;
                    //console.log('card[0].id', card[0].id);
                    card[0].appendChild(card[1]);
                    card[0].appendChild(card[2]);
                    section.appendChild(card[0]);
                });
                container.appendChild(section);
                sectionCategories.appendChild(container);
            }

            console.groupEnd();

            var elements=document.querySelectorAll('[draggable="true"]');
            [].forEach.call(elements,function(item){ //console.log(item);
                item.addEventListener('dragstart', dragStart);
                item.addEventListener('drag', drag);
                item.addEventListener('dragend', dragEnd);
            });

            elements=document.querySelectorAll('[data-element]');
            [].forEach.call(elements,function(item){ //console.log(item);
                item.addEventListener('dragover', dragOver);
                item.addEventListener('dragenter', dragEnter);
                item.addEventListener('dragleave', dragLeave);
                item.addEventListener('drop', drop);
            });

            //window.dragStore = dragStoreInit();
            //console.log('dragStore', window.dragStore);

        }, function(error){
            console.warn(error)
    });
}

function compileGroup(header, status){
    console.groupCollapsed('compileGroup', header, status);
    var groupContainer=document.createElement('div'),
        groupHeader=document.createElement('header'),
        groupCardsContainer=document.createElement('div');
    groupContainer.draggable="true";
    groupContainer.dataset['element']="group";
    groupContainer.className="column";
    groupHeader.appendChild(document.createTextNode(header));
    groupContainer.appendChild(groupHeader);
    groupCardsContainer.dataset['element']="group-card-container";
    groupCardsContainer['data-group-status']=status;
    console.groupEnd();
    return [groupContainer, groupCardsContainer];
}
function compileCard(id, status, contents){
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
function compileCategory(name, category, bg){
    var container   = document.createElement('div'),
        header      = document.createElement('header'),
        section     = document.createElement('section');
    container.id="panel-container-"+name;
    container.draggable="true";
    container.dataset['element']="category";
    container.className="box-panel-container";
    header.appendChild(document.createTextNode('Category'+category));
    container.appendChild(header);
    section.id="box-rows-"+name;
    section.dataset['element']="panel-card-container";
    section.className="box-panel";
    section.style='background-color:'+bg;
    return [container, section];
}

function rebuildData(){
    console.log('rebuildData');
    var data = { tasks: [], categories: [] },
        groups, cards,
        elements=document.querySelectorAll('#section-cards [data-element="group"]');
    for(var i=0, j=elements.length, group; i<j; i++){
        group = elements[i];
        console.group(group.id); // group-new
        console.dir(group);
        data.tasks[i]={};
        groups=data.tasks[i][group.children[0].innerText]=[];
        groups[0]={
            alias:group.id.substr(group.id.indexOf('-')+1),
            bg:group.style.backgroundColor
        };
        groups[1]=[];
        cards=group.childNodes[1].childNodes;
        for(var ii=0, jj=cards.length, card; ii<jj; ii++){
            card = cards[ii];
            groups[1][ii]={};
            groups[1][ii][card.id.substr(4)]=card.innerHTML;
            //console.group(card.id);
            console.dir(card);
            console.groupEnd();
        }
        console.groupEnd();
    }
    /*
    elements=document.querySelectorAll('#section-categories" > div[draggable]');
    [].forEach.call(elements,function(item){
        console.log(item);
    });*/
    console.log('data', data);
}
