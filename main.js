class User {
    constructor(name) {
        this.name = name;
        this.lastVisitDate = new Date(new Date(2017, 0, 1).getTime() + Math.random() *
            (new Date().getTime() - new Date(2017, 0, 1).getTime()));
        this.globalDiscount = Math.floor((Math.random() * 15) + 1);
        this.nightDiscount = Math.floor((Math.random() * 15) + 1);
        this.weekendDiscount = Math.floor((Math.random() * 15) + 1);
        this.ordersCount = Math.floor((Math.random() * 10) + 1);
        this.ordersTotalPrice = Math.floor((Math.random() * 10000) + 1);
        this.bonus = Math.floor((Math.random() * 200) + 1);
    }
}


class Decorators extends User {
    constructor(name) {
        super(name);
    }
    getDiscount() {
        let dateNow = new Date();
        let sum = this.globalDiscount;
        if (dateNow.getHours() > 22 || dateNow.getHours() < 6) {
            sum += this.nightDiscount;
        }
        if (dateNow.getDay() > 5) {
            sum += this.weekendDiscount;
        }
        return sum;
    }

    getBonus() {
        let dateNow = new Date();
        let distance = (dateNow.getTime() - this.lastVisitDate.getTime()) / 1000 / 60 / 60 / 24;
        if (Math.floor(distance) < 11) {
            this.bonus += 240 - parseInt(distance * 24);
        }
        this.ordersCount += 1;
        return this.bonus;
    }
}

//Invocation example
let myUser = new User("Ivan Ivanov");
console.log(myUser);

let myDecoratedUser = new Decorators("Megan Fox");
console.log(myDecoratedUser);
console.log(`Discount for ${myDecoratedUser.name} is ${myDecoratedUser.getDiscount()} $`);
console.log(`Bonus for ${myDecoratedUser.name} is ${myDecoratedUser.getBonus()} $`);
