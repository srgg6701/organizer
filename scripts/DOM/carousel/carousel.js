// todo: try convert moving units from px to %%
// todo: resolve a problem with keeping sizes relative. Probably depends on the todo above
window.onload = function(){
    var btnStart = document.getElementById('btn-carousel-start'),
        btnStop = document.getElementById('btn-carousel-stop'),
        carouselBox = document.getElementById('carousel-box'),
        carouselBoxWidth = carouselBox.offsetWidth,
        carouselBoxContainer = carouselBox.getElementsByTagName('section')[0],
        getFirstSlide = function(){
            return carouselBoxContainer.getElementsByTagName('div')[0];
        },
        pause = 2000,
        tm = 100, steps = pause/tm,
        stepLen = carouselBoxWidth/steps, // 400/20 = 20
        leftStart,
        cnt= 0,
        cntOuter= 1,
        stopCarousel,
        blockCarouselStopping,
        tryCarouselRun,
        outerTm;

    /**
     * Moves a single *slide*
     */
    function innerLoop(){
        console.log('%cinnerLoop', 'color:blue');
        //console.groupCollapsed('start innerLoop');
        blockCarouselStopping=true;
        cntOuter++;
        cnt=0;
        leftStart = -carouselBoxWidth;

        var interv2 = setInterval(function(){
            //console.groupCollapsed('innerLoop Interval');
            //console.log('interv2: %c'+interv2, 'color: rebeccapurple', 'counter:' + cnt*tm);
            cnt++; // 1, 2, 3, 4 ...
            leftStart-=stepLen; // 20 *(1|2|3)
            // -400 -= 20*(1|2|3)
            carouselBoxContainer.style.left=leftStart+'px';
            //
            if(pause===(cnt*tm)){
                carouselBoxContainer.appendChild(getFirstSlide());
                clearInterval(interv2);
                carouselBoxContainer.style.left=-carouselBoxWidth+'px';
                blockCarouselStopping=false;
                if(tryCarouselRun){
                    tryCarouselRun=false;
                    runCarousel();
                }
            }   // console.groupEnd();
        }, tm); // console.groupEnd();
    }

    function runCarousel(){

        if(blockCarouselStopping) {
            tryCarouselRun=true;
            console.log('%ccancel runCarousel', 'background-color:yellow');
            return false;
        }   console.log('%crunCarousel', 'background-color:lightskyblue');
        toggleButtons();
        stopCarousel=false;

        innerLoop();
        var interv = outerTm = setInterval(function (){
            //console.log('%crun innerLoop', 'background-color:violet', 'interv: '+interv);
            if(!stopCarousel) innerLoop();

        }, 4000);
    }

    btnStart.onclick = runCarousel;

    btnStop.onclick = function(){
        stopCarousel = true;
        console.log('%cstop Carousel', 'color:brown');
        clearInterval(outerTm);
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
