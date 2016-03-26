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
        .then(function(response){
            var contents = JSON.parse(response),
                key, value, group, card,
                sectionCards = document.getElementById('section-cards'),
                sectionCatrgories = document.getElementById('section-categories');
            console.log('response', { tasks: contents.tasks, categories: contents.categories });
        for(var cat in contents.tasks){
            console.group('Category:', cat+' ['+contents.tasks[cat][0]+']');
            card='';
            //sectionCards.get
            contents.tasks[cat][1].forEach(function(category){
                key = Object.keys(category)[0];
                value = category[key];
                console.log(key, value);
                card+=compileCard(key, contents.tasks[cat][0], value);
            });

            group = compileGroup(cat, contents.tasks[cat][0], card);
            sectionCards.innerHTML+=group;

            console.groupEnd();
        }
    }, function(error){
            console.warn(error)
    });
}

function compileGroup(header, status, contents){
    console.groupCollapsed('compileGroup', header, status);
    var html = '<div draggable="true" class="column">' +
        '<header>'+header+'</header>' +
    '<div data-group-status="'+status+'">'+contents+'</div>';
        console.log(html);
    console.groupEnd();
    return html;
}
function compileCard(id, status, contents){
    return '<div id="task'+id+'" data-task-status="'+status+'" draggable="true" class="card">'+contents+'<div class="remove" data-action="remove-card-copy" onclick="removeIssueCopyFromPanel(this)"></div>' +
    '</div>';
}
function compileCategory(id, category){
    return '<div id="panel-container-'+id+'" draggable="true" class="box-panel-container" data-drop-area="category-container">' +
        '<header>Category: '+category+'</header>' +
        '<section id="box-rows-'+id+'" data-drop-area="panel" data-drop-target="card-panel" class="cards-container bg-darkmarine box-panel"></section>' +
    '</div>';
}