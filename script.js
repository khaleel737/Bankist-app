'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

console.log(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



// Adding Deposit/Withdrawal Movements:

const movementRows = function (movement, sort = false) {
  containerMovements.innerHTML = '';
  const mov = sort ? movement.slice().sort((a, b) => a - b) : movements;
  mov.forEach((value, index) => {
  const moveType = value > 0 ? `deposit` : `withdrawal`
  const htmlMovements = `
<div class="movements__row">
  <div class="movements__type movements__type--${moveType}">
    ${index + 1} ${moveType}
  </div>
  <div class="movements__value">${value}€</div>
</div>`

containerMovements.insertAdjacentHTML('afterbegin', htmlMovements)

})
}

let sorted = true;

let sorting = sorted = false ? true : false;

btnSort.addEventListener('click', (event) => {
event.preventDefault();

movementRows(currentAccount.movements, !sorting)

sorting = !sorting




})
// console.log(movement);

// const deposits = movements.filter(deposits => deposits > 0);
// console.log(deposits);

// Displaying Accounts

// const accounting = accounts.find(acc => acc.owner === 'Jonas Schmedtmann')

// console.log(accounting);


    for (let accounting of accounts.values()) {
      // console.log(accounting);
  if (accounting.owner === 'Jonas Schmedtmann') {

    console.log(accounting);
  }
  }
  // console.log(accounting);


// Displaying users total balance

// balance(movements.movements)
// console.log(movements);



const calcDisplayBalance = function (acc) {
  acc.totals = acc.movements.reduce((currentDeposit, newDeposit) => currentDeposit + newDeposit,0)
  
  labelBalance.textContent = `€${acc.totals}`;
  
}

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov ,0);

  labelSumIn.textContent = `€${incomes}`;

  const transfers = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov ,0)

  labelSumOut.textContent = `€${Math.abs(transfers)}`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate)/100).filter((interest) => interest >= 1).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `€${interest}`;
  
}


// Login Event Handlers

// console.log(containerMovements.innerHTML);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


currencies.forEach((value, index, map) => {
  console.log(`${index}: ${value}: ${map}`);
})


const currency = new Set(['USD', 'GBP', 'EUR', 'USD', 'JPY', 'GBP']);

// Account UserName Creation

const updateUI = function (acc) {
    // Display Movements
    movementRows(acc.movements)
    // Display Balance
    calcDisplayBalance(acc)
  
    // Display Summary
    calcDisplaySummary(acc)
}


const createUserName = function (accounts) {
  
  
  accounts.forEach(account => {
    account.username = account.owner.toLowerCase().split(' ').map(acc => acc[0]).join('')
    console.log(account);
  })
  console.log(accounts);
}

createUserName(accounts)

let currentAccount;

btnLogin.addEventListener('click', (event) => {
  event.preventDefault()
  console.log('CLICK LOGIN');

  currentAccount = accounts.find(account => account.username === inputLoginUsername.value)

  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    console.log(`LOGIN SUCCCESSFUL`);
  }


  // Clear Inputs 

  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur()
  // Display UI
  labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;

updateUI(currentAccount)

});

btnTransfer.addEventListener('click', (event) => {
event.preventDefault();

const amount = Number(inputTransferAmount.value);
const receivingAcc = accounts.find(account => account.username === inputTransferTo.value);
console.log(amount, receivingAcc);
console.log(receivingAcc.username);
console.log(currentAccount);

inputTransferAmount.value = inputTransferTo.value = '';

if(
    amount > 0 
  && currentAccount.totals >= amount 
  && receivingAcc 
  && receivingAcc?.username !== currentAccount.username) {

  console.log(`TRANSFER COMPLETE`)
  currentAccount.movements.push(-amount)
  receivingAcc.movements.push(amount)
  updateUI(currentAccount)

}
else {console.log(`WHY NOT WORKING ?????????`);}


});


btnLoan.addEventListener('click', (event) => {
  event.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  const currentBalance = labelBalance.value;
  console.log(currentBalance);

  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)){
    currentAccount.movements.push(loanAmount)
    console.log(`its working, yepeee`);
    updateUI(currentAccount);
  }
  // loanAmount.textContent = '';
})


btnClose.addEventListener('click', (event) => {
event.preventDefault()
console.log(`Deleteeee`);

if(inputCloseUsername.value === currentAccount.username  && Number(inputClosePin.value) === currentAccount.pin) {
  const index = accounts.findIndex(acc => acc.username === currentAccount.username);
  // delete currentAccount;
console.log(index);
  accounts.splice(index, 1)

  containerApp.style.opacity = 0;

}
inputCloseUsername.value = inputClosePin.value = '';
})

console.log(accounts);
// We Conclude that forEach on new Set has the first and second parameter as the value and would not return the index of the Set nor duplicates as sets dont return duplicates and only output unique values.

currency.forEach((value, index, array) => {
  console.log(`${value}: ${index}: ${array}`);
})

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements.includes(-130));

const anyDeposits = movements.some(mov =>  mov > 1299);

console.log(anyDeposits);

const max = movements.reduce((acc, mov) => {
  if(acc > mov) {
    return acc;
  } else {
    return mov;
  }
})
console.log(max);

for (const [i, movement] of movements.entries()) {
  if(movement > 0) {
    console.log(`Activity ${i + 1}: You Deposited Money in the Amount of €${movement}`);
  } else {
    console.log(`Activity ${i + 1}: You Withdrawn Money in the Amount of €${Math.abs(movement)}`);
  }
}

// Separation
console.log(`------------Separation---------`);

// With the For each

movements.forEach((movement, i, array) => {
  if(movement > 0) {
    console.log(`Activity ${i + 1}: You Deposited Money in the Amount of €${movement}`);
  } else {
    console.log(`Activity ${i + 1}: You Withdrawn Money in the Amount of €${Math.abs(movement)}`);
  }
})

/////////////////////////////////////////////////


const arr = ['a', 'b', 'c', 'd'];

const arr2 = ['e', 'f', 'g', 'h'];

console.log(arr.concat(arr2).join('-'));


console.log(arr.at(2, 1))

console.log('Khaleel'.at(0));




///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

*/



const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

function dogAge (age) {

  const dog = [];
  const puppy = [];
// console.log(dog, puppy);
  age.forEach((year) => {

    if(year >= 3) {

      dog.push(year)
    } else {
      puppy.push(year)
    }
  })
  console.log(dog);
  console.log(puppy);

  // julia.forEach(arr => console.log(arr))

  const humanYears = function (dogYears) {
    const humanAge = dogYears.map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4).filter(adultAge => adultAge > 18).reduce((acc, curr, i, arr) => (acc + curr) / arr.length, 0);
    console.log(humanAge);
  }

  humanYears([4, 1, 15, 8, 3])

  // checkDog(dogAge(julia), dogAge(kate))
  // console.log(checkDog(dogAge(julia), dogAge(kate)));
  function checkDog (dogsJulia, dogsKate, first, last) {
    const correctedDogs = [];
    const copyJulia = dogsJulia.slice(first, last);
    const copyKate = dogsKate.slice();

    correctedDogs.push(copyJulia, copyKate)
      console.log(copyJulia);
      console.log(copyKate);
      // console.log(correctedDogs);
  }
  checkDog(julia, kate, 1, -2);
}


dogAge(julia)
dogAge(kate)




const reducing = [1, 2, 3, 4];


reducing.reduce((num, newNum) => {return num + newNum}, 0)

// console.log(num, newNum)

const array1 = [1, 2, 3, 4];
const reducer = array1.reduce((previousValue, currentValue, i) => {
return previousValue + currentValue;
}, 10);

// 1 + 2 + 3 + 4
console.log(reducer);
// expected output: 10

// 5 + 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer, 5));
// expected output: 15

let numbers = [1, 2, 3];

let sum = reducing.reduce(function (accumulator, current) {
  return accumulator + current;
});
console.log(sum); // 6



const news = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const array = [];

console.log(Array.from(news));


const paragraph = 'Khaleel is Awesome';

const searchTerm = 'Awesome';

console.log(`Khaleel has been awesome ${paragraph.lastIndexOf(searchTerm)}`);


const eurToUSD = 1.1;
const movementsTwo = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balanceUSD = movementsTwo.filter(mov => mov > 0).map(mov => mov * eurToUSD).reduce((acc, mov) => acc + mov ,0);

console.log(balanceUSD);

// const deposits = movementsTwo.filter(deposits => deposits > 0);

// const balance = function (balances) {
//   const totals = balances.reduce((currentDeposit, newDeposit) => currentDeposit + newDeposit,0)

//   labelBalance.textContent = `$${totals}`;
// }

// balance(deposits)

// console.log(deposits);

// let balances = 0;

// for (const deposit of deposits) balances += deposit

// console.log(balances);

// const withdraws = movementsTwo.filter(withdrawal => {
//   return withdrawal < 0;
// })

// console.log(withdraws);

// const withdrawing = [];

// for (const withdraw of movementsTwo) {
//   if(withdraw < 0) {
//     withdrawing.push(Math.abs(withdraw))
//   }
// }



// console.log(withdrawing);

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀 */

/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);*/


console.log(movements.every(mov => mov > 0));

console.log(account4.movements.every(mov => mov > 0));


const arrayFlat = [[1, 2, 3], 4, 5, 6, [7, 8, 9]]

console.log(arrayFlat.flat());

const arrayFlatTwo = [[1, 2,[3, 4, 1, 11, 39], 3], 4, 5, 6, [7, 8, 9]]

const allAccountsMovements =  accounts.flatMap(mov => mov.movements).reduce((acc, mov) => acc + mov, 0);

console.log(allAccountsMovements);

console.log(arrayFlatTwo.flat(6));


// Flatmap only uses 1 level deep

// Flat goes more than 1 level

// .Sort

// Return movements < 0 = A then B
// Return movements > 0 = B then A


console.log(movements.sort((a, b) => a - b));
console.log(movements.sort((a, b) => b - a));


console.log(movements.sort((a, b) => {
  if(a > b)
    return -1;
   if (b > a) 
    return 1;
}));


// console.log(movements);



// Creating Arrays

const array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const array4 = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

array4.fill(9, 4, 5)

console.log(array3);
console.log(array4);


const newArray = new Array(7);


// Fill method inserts the empty array with the value specified in fill

newArray.fill(7, 5, 6)

console.log(newArray);

// new way instead of .fill and new Array method

const y = Array.from({length: 7}, () => 1);

console.log(y);

const counting = Array.from({length: 25}, (acc, index) => index + 1);

console.log(counting);

// const randomDice = Array.from({length: 100}, (acc, index) =>  Math.floor(Math.random() * 100) + 1);

// console.log(randomDice);

// account1.movements.push(120 )

const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(deposits => deposits > 0).reduce((acc, curr) => acc + curr ,0);

const depositsGreaterThan1000 = accounts.flatMap(acc => acc.movements).filter(deposits => (deposits > 1000)).length;


const sumDepositsGreater1000 = accounts.flatMap(acc => acc.movements).reduce((acc, curr) => acc + (curr >= 1000) , 0);

// Or another method

const sumDepositsGreater1000two = accounts.flatMap(acc => acc.movements).reduce((acc, curr) => curr >= 1000 ? ++acc : acc , 0);

console.log(sumDepositsGreater1000two);


console.log(sumDepositsGreater1000);

console.log(depositsGreaterThan1000);

console.log(bankDepositSum);


const {deposits, withdrawals} = accounts.flatMap(accounts => accounts.movements).reduce((acc, curr, index) => {

  // console.log(acc, curr.movements);

//   console.log(curr);

// const allAmounts = curr.movements.concat(curr.movements);

// console.log(curr.movements);

// console.log(allAmounts);

  acc[curr > 0 ? `deposits` : `withdrawals`] += curr;

  return acc;

}, {deposits: 0, withdrawals: 0});

console.log(deposits, withdrawals);


// Convert Title Case

const capitalSentances = function (string) {

const exceptions = ['this', 'first', 'goes', 'here', 'nothing']
const capitalization = strings => strings[0].toUpperCase() + strings.slice(1);

const sentance = string.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalization(word)).join(' ');


return capitalization(sentance);
}
console.log(capitalSentances('This is my first Attempt in Doing this'))
console.log(capitalSentances('and im Not SURE IF iM Right witH tHiS'))
console.log(capitalSentances('HerE GoeS NoTHinG wiTH ThiS thiNG'))

function numberMasker (number) {
  const masking = number;
  const lastFourDigits = masking.slice(-4)
  const maskedNumbers = lastFourDigits.padStart(masking.length, 'X');
  console.log(maskedNumbers);
}

console.log(numberMasker('8734-9287-9847-2898'));


// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

console.log(dogs[0].weight);

const recFood = dogs.forEach((food, index) => {

let recommendedFood = (food.weight ** 0.75 * 28);

food.recommended = recommendedFood

food.curFood > (food.recommended * 0.90) && food.curFood < (food.recommended * 1.10) ? food.ownersEatTooMuch = `Dog is eating well` : food.ownersEatTooLittle = `Dog is eating too much!!!`

let ownersString = food.owners;

console.log(ownersString);

console.log(recommendedFood);
}); 

console.log(recFood);

console.log(dogs);


const toJadenCase = function (str) {
  //...
  
  const splitted = str.toLowerCase().split(' ');
  console.log(splitted);
  const capitalization = strings => strings[0].toUpperCase() + strings.slice(1);
  
return capitalization(splitted)};

console.log(toJadenCase('How can mirrors be real if our eyes aren\'t real'));

// + splitted.splice(1)

function alphabetPosition(text) {
const alphas = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';

console.log(alphas);


}

console.log(alphabetPosition('The sunset sets at twelve o\'clock.'))