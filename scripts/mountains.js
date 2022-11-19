"use strict";

const mountainsList = document.getElementById("mountainsList");
const mountainInfo = document.getElementById("mountainInfo");
const mountainInfoCard = document.getElementById("mountainInfoCard");
const mountainInfoCardTitle = document.getElementById("MountainInfoCardTitle");
const mountainInfoCardImg = document.getElementById("mountainInfoCardImg");
let option = new Option("Select a mountain", "select");
mountainsList.appendChild(option);

window.onload = init;

function init() {
    initMountainsList();
    mountainsList.onchange = displayInfo;
}

function initMountainsList() {
    for (let mountain of mountainsArray) {
        let option = new Option(mountain.name, mountain.name);
        mountainsList.appendChild(option);
    }
}

async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}

function displayInfo() {
    mountainInfo.innerHTML = "";
    for (let mountain of mountainsArray) {
        if (mountainsList.value == "select") {
            mountainInfoCard.style.display = "none";

        }
        else if (mountain.name == mountainsList.value) {
            mountainInfoCardTitle.innerText = mountain.name;
            mountainInfo.innerHTML += "<span class='fw-bold'>Description: </span>" + mountain.desc + "<br><span class='fw-bold'>Elevation: </span>" + mountain.elevation + "<br><span class='fw-bold'>Coordinates: </span>" + mountain.coords.lat + ", " + mountain.coords.lng;
            getSunsetForMountain(mountain.coords.lat, mountain.coords.lng).then(data => {
                mountainInfo.innerHTML += "<br><span class='fw-bold'>Sunrise Time: </span>" + data.results.sunrise +  "<br><span class='fw-bold'>Sunset Time: </span>" + data.results.sunset;
            });
            mountainInfoCardImg.src = "images/" + mountain.img;
            mountainInfoCard.style.display = "block";
            break;
        }
    }
}

