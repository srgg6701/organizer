var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
console.log('exec[1]', result);

re = /hello.*(child).*(are)/ig;
result = re.exec('Oh... Hello, hello, child, are you here?');
console.log('exec[2]', result);

console.log('match[1]', 'Oh... Hello, hello, child, are you here?'.match(/hello.*(child).*(are)/ig));
console.log('match[2]', 'Oh... Hello, hello, child, are you here?'.match(/h*el/g));
