window.onload = function(){
    var btnStart = document.getElementById('btn-carousel-start'),
        btnStop = document.getElementById('btn-carousel-stop'),
        carouselBox = document.getElementById('carousel-box'),
        carouselBoxWidth = carouselBox.offsetWidth,
        carouselBoxContainer = carouselBox.getElementsByTagName('section')[0],
        slides = carouselBox.getElementsByTagName('div'),
        getFirstSlide = function(){
            return carouselBoxContainer.getElementsByTagName('div')[0];
        },
        interv, interv2, stopCarousel;
    btnStart.onclick = function(){
        toggleButtons();
        stopCarousel=false;
        var pause = 1000, tm = 100, steps = pause/tm, // 20
            stepLen = carouselBoxWidth/steps, // 400/20 = 20
            leftStart,
            cnt=0, cntOuter= 1,
            innerLoop = function moveSlide(){
                //console.groupCollapsed('start innerLoop');
                cntOuter++;
                leftStart = -carouselBoxWidth;
                interv2 = setInterval(function(){

                    cnt++; // 1, 2, 3, 4 ...
                    leftStart-=stepLen; // 20 *(1|2|3)
                    // -400 -= 20*(1|2|3)
                    carouselBoxContainer.style.left=leftStart+'px';

                    if(pause===(cnt*tm)){
                        carouselBoxContainer.appendChild(getFirstSlide());
                        clearInterval(interv2);
                        carouselBoxContainer.style.left=-carouselBoxWidth+'px';
                        if(stopCarousel) {
                            clearInterval(interv2);
                        }
                    }
                }, tm); //console.groupEnd();
            };

            innerLoop();

            interv = setInterval(function moveSlides(){
                cnt=0;
                (stopCarousel) ? clearInterval(interv) : innerLoop();
            }, 4000);
    };
    btnStop.onclick = function(){
        //console.log('stop!');
        stopCarousel = true;
        toggleButtons();
    };
    function toggleButtons(){
        var disabled = 'disabled';
        [btnStart,btnStop].forEach(function (button) {
            button.getAttribute(disabled) ?
                button.removeAttribute(disabled)
                : button.setAttribute(disabled, disabled);
        });

    }
};
