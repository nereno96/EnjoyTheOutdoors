"use strict"

const mountainsList = document.getElementById("mountainsList");
const mountainInfo = document.getElementById("mountainInfo");
const mountainInfoCard = document.getElementById("mountainInfoCard");
const mountainInfoCardTitle = document.getElementById("MountainInfoCardTitle");
const mountainInfoCardImg = document.getElementById("mountainInfoCardImg");
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
            mountainInfoCard.style.display = "none"

        }
        else if (mountain.name == mountainsList.value) {
            mountainInfoCardTitle.innerText = mountain.name;
            mountainInfo.innerHTML += mountain.desc;
            mountainInfoCardImg.src = "images/" + mountain.img;
            mountainInfoCard.style.display = "block"
            break;
        }
    }
}

