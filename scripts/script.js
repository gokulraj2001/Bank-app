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
        main.appendChild(element);
    })

    function formatToCurrency(amount){
        return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }

}


// call Random User
getRandomUser();
getRandomUser();
getRandomUser();


// event listeners
btnAddUser.addEventListener('click', getRandomUser)