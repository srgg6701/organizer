function App(options){
    console.log({options:options});
    if(options.text) $(options.root).text(options.text);
    if(options['background-color']) $(options.root).css('background-color', options['background-color']);
}