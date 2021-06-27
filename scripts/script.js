'use strict';

const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double');
const btnFilter = document.getElementById('filter-rich');
const btnTotal = document.getElementById('total');
// add user button
let data = [];


// fetch a random user from random user API

const getRandomUser= async function(){
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()*100000), 
    };
    addData(newUser);
}

// function addData

const addData = function(obj){
    data.push(obj);
    updateDOM();
};

// update DOM
const updateDOM = function(providedData = data){
    // clear main
    main.innerHTML = "<h2><strong>Name</strong>Balance</h2>";
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('users');
        element.innerHTML = `<strong>${item.name}</strong>₹${formatToCurrency(item.balance)}`;
        main.appendChild(element)
    });
};

function formatToCurrency(amount){
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') ;
}

// double balance

const doubleBalance = function(){
    data = data.map(user =>{
        return {...user, balance: user.balance*2};
    });
    updateDOM();
};

// filter rich

const filterRich = function(){
    data = data.filter((user) => user.balance > 50000);
    updateDOM();
};

// total balance
const totalBalance = function(){
    const wealth = data.reduce((acc, user) => (acc = acc + user.balance), 0);
    console.log(wealth);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Balance: <strong>${formatToCurrency(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);

}
// call Random User
getRandomUser();
getRandomUser();
getRandomUser();


// event listeners
btnAddUser.addEventListener('click', getRandomUser);

btnDouble.addEventListener('click', doubleBalance);

btnFilter.addEventListener('click', filterRich);

btnTotal.addEventListener('click', totalBalance);