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
        slidesLength = slides.length,
        interv, interv2, stop1, stop2;
    btnStart.onclick = function(){
        /*console.log({
            carouselBox:carouselBox,
            carouselBoxContainer:carouselBoxContainer,
            slides:slides
        });*/ // 400/10
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
                    /*console.log({
                        count:cnt*tm,
                        styleLeft:carouselBoxContainer.style.left
                    });*/
                    if(stop2) clearInterval(interv2);
                    if(pause===(cnt*tm)){
                        carouselBoxContainer.appendChild(getFirstSlide());
                        clearInterval(interv2);
                        carouselBoxContainer.style.left=-carouselBoxWidth+'px';
                        //console.log('stop! carouselBoxWidth: '+carouselBoxWidth+' : '+carouselBoxContainer.style.left);
                    }
                }, tm); // 10
                //console.groupEnd();
            };

            innerLoop();

            interv = setInterval(function moveSlides(){
                //console.group('start interv, cntOuter = '+cntOuter+', slidesLength = '+slidesLength);
                cnt=0;
                innerLoop();
                if(stop1) clearInterval(interv);
                //console.groupEnd();
            }, 4000);
    };
    btnStop.onclick = function(){
        console.log('stop!');
        stop1 = true;
        stop2 = true;
    };
};
