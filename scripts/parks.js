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
}

// initializes the location list
function initLocationsList() {
    locationsList.length = 0;
    parkInfoPara.style.display = "none"

    let locationOption = new Option("Select a location", "select"); // creates select option for dropdown
    locationsList.appendChild(locationOption); // adds "select" option to dropdown

    for (let location of locationsArray) {
        let option = new Option(location, location);
        locationsList.appendChild(option);
    }
}

// initializes the park type list
function initParkTypeList() {
    parkTypeList.length = 0;
    parkInfoPara.style.display = "none"

    let parkTypeOption = new Option("Select a park type", "select"); // creates select option for dropdown
    parkTypeList.appendChild(parkTypeOption); // adds "select" option to dropdown

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
        initLocationsList();
        locationsList.style.display = "block"
    }
    else if (filterOptionsList.value == "type") {
        initParkTypeList();
        parkTypeList.style.display = "block"
    }
    else {
        locationsList.style.display = "none"
        parkTypeList.style.display = "none"
        parkInfoPara.style.display = "none"
    }
}

// populates parkList based on location chosen
function parksByLocation() {
    parkList.length = 0;
    parkInfoPara.style.display = "none"

    let parkOption = new Option("Select a park", "select"); // creates select option for dropdown
    parkList.appendChild(parkOption); // adds "select" option to dropdown

    for (let park of nationalParksArray) {
        if (locationsList.value == park.State) {
            let option = new Option(park.LocationName, park.LocationID);
            parkList.appendChild(option);
        }
    }
    if(locationsList.value != "select") {
        parkList.style.display = "block"
    }
    else {
        parkList.style.display = "none"
        parkInfoPara.style.display = "none"
    }
}

// populates parkList based on parkType chosen
function parksByType() {
    parkList.length = 0;
    parkInfoPara.style.display = "none"

    let parkOption = new Option("Select a park", "select"); // creates select option for dropdown
    parkList.appendChild(parkOption); // adds "select" option to dropdown

    for (let park of nationalParksArray) {
        if (park.LocationName.indexOf(parkTypeList.value) != -1) {
            let option = new Option(park.LocationName, park.LocationID);
            parkList.appendChild(option);
        }
    }
    if(parkTypeList.value != "select") {
        parkList.style.display = "block"
    }
    else {
        parkList.style.display = "none"
        parkInfoPara.style.display = "none"
    }
}

// displays park info when park is selected
function displayParkInfo() {
    for (let park of nationalParksArray) {
        if (parkList.value == park.LocationID) {
            parkInfoPara.innerHTML = "<span class='fw-bold'>Mailing Address: </span><br>" + park.LocationName + " (" + park.LocationID + ")  <br>" + park.Address + "<br>" + park.City + ", " + park.State + " " + park.ZipCode + "<br><span class='fw-bold'>Phone Number:</span> " + park.Phone + "<br><span class='fw-bold'>Fax Number:</span> " + park.Fax + "<br><span class='fw-bold'>Coordinates:</span> " + park.Latitude + ", " + park.Longitude;
        }
    }
    if(parkList.value != "select") {
        parkInfoPara.style.display = "block"
    }
    else {
        parkInfoPara.style.display = "none"
    }
}

// consider using .visually-hidden class instead of style.display.none to hide and unhide elements for acessibilty purposes in the future