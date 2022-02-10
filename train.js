const hamster = {
  home: [1, 2],
  money: [1, 2, 3],
  time: [2, 3],
  location: [1, 2],
};

const husky = {
  home: [2],
  money: [2, 3],
  time: [3],
  location: [2],
};

const crocodile = {
  home: [2],
  money: [3],
  time: [3],
  location: [1],
};

// class Animal {
//   #home;
//   #money;
//   #time;
//   #location;
  
//   constructor(home, money, time, location ) {
//     this.#home = home
//     this.#money = money
//     this.#time = time
//     this.#location = location
//   }
// }


// class Croc extends Animal{
//   constructor(home, money, time, location){
//     super(home, money, time, location)
//   }
// }

// const croc = new Croc(1,2,3,4)
// console.log(croc);

const arrAnimals = [
  hamster,
  husky,
  crocodile,
];

const arr = arrAnimals.filter((animal) => animal.home.includes(1) && animal.money.includes(1) && animal.time.includes(2) && animal.location.includes(1));

console.log(arr);
