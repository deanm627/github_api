'use strict';

const input = document.getElementById('user_name');
const form = document.querySelector('#form');
const results = document.getElementById('results');
const issues = document.getElementById('issues_list');

document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM loaded");

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const inputValue = input.value;
        const userUrl = `https://api.github.com/users/${inputValue}`;
        const response = await getInfo(userUrl);
        console.log(response);
        displayUserInfo(response);
    });

    const rootUrl = 'https://api.github.com/repos/facebook/create-react-app/issues';

    const issuesListObj = await getInfo(rootUrl);
    console.log(issuesListObj);
    makeList(issuesListObj);
    
});

function displayUserInfo(obj) {
    form.reset();
    results.innerHTML = "";
    for (const [key, value] of Object.entries(obj)) {
        let infoLine = document.createElement('p');
        infoLine.innerText = `${key}: ${value}`;
        results.appendChild(infoLine);
    }
    return;
};

function makeList(obj) {
    issues.innerHTML = "";
    const list = document.createElement('ul');
    for (let i=0; i<Object.keys(obj).length; i++) {
        for (const [key, value] of Object.entries(obj[i])) {
            const item = document.createElement('a');
            item.classList.add('itemTitle');
            const itemBody = document.createElement('p');
            itemBody.classList.add('itemBody');
            if (key === 'url') {
                item.value = value;
            }
            if (key === 'title') {
                item.innerText = value;
            }
            if (key === 'body') {
                itemBody.innerText = value;
            }
            item.appendChild(itemBody);
            list.appendChild(item);
            }
    }
    issues.appendChild(list);
    return;
};
