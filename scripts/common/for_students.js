var group = {
    title: "Наш курс",
    students: ["Вася", "Петя", "Даша"],

    showList: function() {

        this.students.forEach(
            function(student) {
                console.log(this.title);
                console.log('Hello, ', student);
            }
        )
    }
};

group.showList();

/*
"use strict";

let group = {
    title: "Наш курс",
    students: ["Вася", "Петя", "Даша"],

    showList: function() {
        this.students.forEach(
            (student) => console.log(`${this.title}: ${student}`)
        )
    }
};

group.showList();*/
