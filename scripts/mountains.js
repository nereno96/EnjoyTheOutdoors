"use strict"

const mountainsList = document.getElementById("mountainsList");
let option = new Option("Select a mountain", "select");
mountainsList.appendChild(option);
window.onload = function() {
    initMountainsList();
    mountainsList.onchange = displayInfo;
}

function initMountainsList() {
    for (let mountain of mountainsArray) {
        let option = new Option(mountain.name, mountain.img);
        mountainsList.appendChild(option);
    }
}

function displayInfo() {
    
}