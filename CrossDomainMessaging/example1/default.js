/*window.onload = ()=> {
    const messForm = document.getElementById('messForm'),
        txtArea = messForm.mess,
        receiver = document.getElementById('php-frame');
    messForm.onsubmit=(event)=>{
        event.preventDefault();
        receiver.contentWindow.postMessage(txtArea.value, '*');
    };
};*/

window.addEventListener('message', (event)=>{
    let h1 = document.querySelector('body>h1').innerHTML;
    if(event.origin=='http://127.0.0.1:8080'){
        document.querySelector('body').style.backgroundColor='yellow';
    }
    //------------------------------------------
    console.log('receiver: CrossDomainMessaging', {
        data: event.data, origin: event.origin, form:h1
    });
});