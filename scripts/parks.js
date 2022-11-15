"use strict"

const filterOptionsList = document.getElementById("filterOptionsList");
const locationsList = document.getElementById("locationsList");
const parkTypeList = document.getElementById("parkTypeList");
const parkList = document.getElementById("parkList");
const parkInfoPara = document.getElementById("parkInfoPara");


window.onload = function() {
    filterOptionsList.onchange = displayList;
    locationsList.onchange = parksByLocation;
    parkTypeList.onchange = parksByType;
    parkList.onchange = displayParkInfo;
    initLists();
}

// initializes the location and park type list
function initLists() {
// consider making the location and parkType lists a singular select and populating it based on the filter selected instead of two separate selects that are displayed when their filter is chosen
    for (let location of locationsArray) {
        let option = new Option(location, location);
        locationsList.appendChild(option);
    }
    for (let parkType of parkTypesArray) {
        let option = new Option(parkType, parkType);
        parkTypeList.appendChild(option);
    }
}

// chooses which list to display based on which filter option is selected
function displayList() {
    locationsList.style.display = "none";
    parkTypeList.style.display = "none";
    parkList.style.display = "none";

    if (filterOptionsList.value == "location") {
        locationsList.style.display = "block"
    }
    else if (filterOptionsList.value == "type") {
        parkTypeList.style.display = "block"
    }
    else {
        locationsList.style.display = "none"
        parkTypeList.style.display = "none"
    }
}

// populates parkList based on location chosen
function parksByLocation() {
    parkList.length = 0;
    for (let park of nationalParksArray) {
        if (locationsList.value == park.State) {
            let option = new Option(park.LocationName, park.LocationID);
            parkList.appendChild(option);
        }
    }
    parkList.style.display = "block"
}

// populates parkList based on parkType chosen
function parksByType() {
    parkList.length = 0;
    for (let park of nationalParksArray) {
        if (park.LocationName.indexOf(parkTypeList.value) != -1) {
            let option = new Option(park.LocationName, park.LocationID);
            parkList.appendChild(option);
        }
    }
    parkList.style.display = "block"
}

function displayParkInfo() {
    for (let park of nationalParksArray) {
        if (parkList.value == park.LocationID) {
            parkInfoPara.innerHTML = park.LocationName + " (" + park.LocationID + ") is located at " + park.Address + " in " + park.City + ", " + park.State + " ";
        }
    }
}
