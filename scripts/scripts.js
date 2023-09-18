'use strict';

const input = document.getElementById('user_name');
const form = document.querySelector('#form');
const results = document.getElementById('results');

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");

    const rootUrl = 'https://api.github.com/users/'

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const inputValue = input.value;
        const userUrl = `https://api.github.com/users/${inputValue}`;
        const response = await getResponse(userUrl);
        console.log(response);
        displayUserInfo(response);
    });
    
});

async function getResponse(url) {
    const response = await getInfo(url);
    return response;
}

function displayUserInfo(obj) {
    form.reset();
    const infoArr = Object.entries(obj);
    results.innerHTML = "";
    for (let i=0; i<infoArr.length; i++) {
        let infoLine = document.createElement('p');
        infoLine.innerText = infoArr[i][0] + ": " + infoArr[i][1];
        results.appendChild(infoLine);
    };
    return;
}