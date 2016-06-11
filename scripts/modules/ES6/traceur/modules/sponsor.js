export class Sponsor{
    constructor(name){
        this._name = name;
    }
    get name(){
        return this._name;
    }
    sayName(){
        console.log(`Sponsor name is ${this.name}`);
    }
}