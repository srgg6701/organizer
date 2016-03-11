var home;
function dragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
}
function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = "copy";
    ev.dataTransfer.dropEffect = "copy";
    var card = ev.target, cardContainer=card.parentNode;
    if(!cardContainer.classList.contains("container-horizontal")&&
       !cardContainer.classList.contains("cards-container-panel")){
        home=document.getElementById(ev.target.id).parentNode;
        console.log('home', home);
    }
    console.log('container-horizontal: ', card.parentNode.classList.contains("container-horizontal"));
}
function drop(ev) {
    var cardId = ev.dataTransfer.getData("text"),
        receiver=ev.target, card;

    console.log({'ev.dataTransfer':ev.dataTransfer, receiver:receiver});
    // card container
    if(receiver.classList.contains("cards-container")||receiver.classList.contains("cards-container-panel")){
        ev.preventDefault();
        card = document.getElementById(cardId);
        // if came to container
        if(receiver.classList.contains("container-horizontal")){
            var cloneId=cardId+'_';
            if(!document.getElementById(cloneId)){
                var orig=card.cloneNode(true);
                orig.id=cloneId;
                orig.removeAttribute('draggable');
                orig.removeAttribute('ondragstart');
                console.log("%ccontainer-horizontal", 'color:green',{'orig':orig, card:card, receiver:receiver, home:home});
                receiver.appendChild(orig);
                home.appendChild(card); // old place
            }
        }else{
            if(receiver.classList.contains("cards-container")){ //receiver.id=='tasks-container'
                console.log('%couter-container', 'color:orange',{card:card, receiver:receiver});
                receiver.appendChild(card);
            }else{
                console.log('%ctop bar', 'color:violet',{card:card, receiver:receiver, home:home});
                if(receiver.classList.contains("cards-container-panel")){
                    var parentContainer=card.parentNode,
                        containers=parentContainer.getElementsByClassName('cards-container-panel');

                    for(var i= 0, j=containers.length, cardIndex, receiverIndex; i<j; i++){
                        console.log('container: ', containers[i]);
                        if(containers[i]==card){
                            cardIndex=i;
                            console.log('card!', {card:card, container:containers[i]});
                        }
                        if(containers[i]==receiver){
                            receiverIndex=i;
                            console.log('receiver!', {receiver:receiver, container:containers[i]});
                        }
                        if(cardIndex&&receiverIndex) break;
                    }
                    if(cardIndex>receiverIndex)
                        parentContainer.insertBefore(card, receiver);
                    else
                        parentContainer.appendChild(card);

                    home=null;
                }
            }
        }
    }
}
function preventInner(ev){
    //return false;
}