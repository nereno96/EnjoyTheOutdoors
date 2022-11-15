"use strict"

const mountainsList = document.getElementById("mountainsList");
const mountainInfo = document.getElementById("mountainInfo");
let option = new Option("Select a mountain", "select");
mountainsList.appendChild(option);

window.onload = function() {
    initMountainsList();
    mountainsList.onchange = displayInfo;
}

function initMountainsList() {
    for (let mountain of mountainsArray) {
        let option = new Option(mountain.name, mountain.name);
        mountainsList.appendChild(option);
    }
}

function displayInfo() {
    mountainInfo.innerHTML = "";
    for (let mountain of mountainsArray) {
        if (mountainsList.value == "select") {
            mountainInfo.innerHTML = "";
        }
        else if (mountain.name == mountainsList.value) {
            mountainInfo.innerHTML += "<br>" + mountain.desc + "<br><img src='images/" + mountain.img + "' width='100%'></img>";
        }
    }
}

