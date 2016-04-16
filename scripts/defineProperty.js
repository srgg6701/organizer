var user = {
    firstName: "Вася",
    surname: "Петров"
};

Object.defineProperty(user, "fullName", {
    get: function() {
        return this.firstName + ' ' + this.surname;
    },
    set: function(value) {
        var split = value.split(' ');
        this.firstName = split[0];
        this.surname = split[1];
    }
});

user.fullName = "Петя Иванов"; // вызывает get, set
console.log('user.firstName: '+user.firstName); // Петя
console.log('user.surname'+user.surname); // Иванов

var user2 = {
    firstName: "Вася",
    surname: "Петров",

    get fullName() {
        return this.firstName + ' ' + this.surname;
    },

    set fullName(value) {
        var split = value.split(' ');
        this.firstName = split[0];
        this.surname = split[1];
    }
};

console.log('user2.fullName'+user2.fullName); // Вася Петров (из геттера)

user2.fullName = "Петя Иванов";
console.log('user2.firstName'+user2.firstName); // Петя  (поставил сеттер)
console.log('user2.surname'+user2.surname); // Иванов (поставил сеттер)