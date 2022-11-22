"use strict";

const filterOptionsList = document.getElementById("filterOptionsList");
const locationsList = document.getElementById("locationsList");
const parkTypeList = document.getElementById("parkTypeList");
const parkList = document.getElementById("parkList");
const parkInfoPara = document.getElementById("parkInfoPara");
const parkInfoJumbo = document.getElementById("parkInfoJumbo");
const visitBtn = document.getElementById("visitBtn");


window.onload = init; 

function init() {
    filterOptionsList.onchange = displayList;
    locationsList.onchange = parksByLocation;
    parkTypeList.onchange = parksByType;
    parkList.onchange = displayParkInfo;
}

// initializes the location list
function initLocationsList(select, infoLocation) {
    select.length = 0;
    infoLocation.style.display = "none";

    let locationOption = new Option("Select a location", "select"); // creates select option for dropdown
    select.appendChild(locationOption); // adds "select" option to dropdown

    for (let location of locationsArray) {
        let option = new Option(location, location);
        select.appendChild(option);
    }
    // select = locationsList
    // infoLocation = parkInfoJumbo
}

// initializes the park type list
function initParkTypeList(select, infoLocation) {
    select.length = 0;
    infoLocation.style.display = "none";

    let parkTypeOption = new Option("Select a park type", "select"); // creates select option for dropdown
    select.appendChild(parkTypeOption); // adds "select" option to dropdown

    for (let parkType of parkTypesArray) {
        let option = new Option(parkType, parkType);
        parkTypeList.appendChild(option);
    }
    // select = parkTypeList
    // infoLocation = parkInfoJumbo
}

function initNoFilter(topSelect, finalSelect, infoLocation) {
    finalSelect.length = 0;
    infoLocation.style.display = "none";

    let parkOption = new Option("Select a park", "select"); // creates select option for dropdown
    finalSelect.appendChild(parkOption); // adds "select" option to dropdown

    for (let park of nationalParksArray) {
            let option = new Option(park.LocationName, park.LocationID);
            finalSelect.appendChild(option);
    }
    if(topSelect.value != "select") {
        finalSelect.style.display = "block";
    }
    else {
        finalSelect.style.display = "none";
        infoLocation.style.display = "none";
    }
    //inalSelect = parkList
    //infoLocation = parkInfoJumbo
}

// chooses which list to display based on which filter option is selected
function displayList(topSelect, secondSelect, finalSelect, infoLocation) {
    secondSelect.style.display = "none";
    finalSelect.style.display = "none";

    if (topSelect.value == "location") {
        initLocationsList(secondSelect, infoLocation);
        secondSelect.style.display = "block";
    }
    else if (topSelect.value == "type") {
        initParkTypeList(secondSelect, infoLocation);
        secondSelect.style.display = "block";
    }
    else if (topSelect.value == "all") {
        initNoFilter();
        finalSelect.style.display = "block";
    }
    else {
        secondSelect.style.display = "none";
        infoLocation.style.display = "none";
    }
}

// populates parkList based on location chosen
function parksByLocation() {
    parkList.length = 0;
    parkInfoJumbo.style.display = "none";

    let parkOption = new Option("Select a park", "select"); // creates select option for dropdown
    parkList.appendChild(parkOption); // adds "select" option to dropdown

    for (let park of nationalParksArray) {
        if (locationsList.value == park.State) {
            let option = new Option(park.LocationName, park.LocationID);
            parkList.appendChild(option);
        }
    }
    if(locationsList.value != "select") {
        parkList.style.display = "block";
    }
    else {
        parkList.style.display = "none";
        parkInfoJumbo.style.display = "none";
    }
}

// populates parkList based on parkType chosen
function parksByType() {
    parkList.length = 0;
    parkInfoJumbo.style.display = "none";

    let parkOption = new Option("Select a park", "select"); // creates select option for dropdown
    parkList.appendChild(parkOption); // adds "select" option to dropdown

    for (let park of nationalParksArray) {
        if (park.LocationName.indexOf(parkTypeList.value) != -1) {
            let option = new Option(park.LocationName, park.LocationID);
            parkList.appendChild(option);
        }
    }
    if(parkTypeList.value != "select") {
        parkList.style.display = "block";
    }
    else {
        parkList.style.display = "none";
        parkInfoJumbo.style.display = "none";
    }
}

// displays park info when park is selected
function displayParkInfo() {
    for (let park of nationalParksArray) {
        if (parkList.value == park.LocationID) {
            if (park.Visit == undefined) {
                parkInfoPara.innerHTML = "<span class='fw-bold'>Mailing Address: </span><br>" + park.LocationName + " (" + park.LocationID + ")  <br>" + park.Address + "<br>" + park.City + ", " + park.State + " " + park.ZipCode + "<br><span class='fw-bold'>Phone Number:</span> " + park.Phone + "<br><span class='fw-bold'>Fax Number:</span> " + park.Fax + "<br><span class='fw-bold'>Coordinates:</span> " + park.Latitude + ", " + park.Longitude;
                visitBtn.style.display = "none";
            }
            else if (park.Visit != undefined) {
                parkInfoPara.innerHTML = "<span class='fw-bold'>Mailing Address: </span><br>" + park.LocationName + " (" + park.LocationID + ")  <br>" + park.Address + "<br>" + park.City + ", " + park.State + " " + park.ZipCode + "<br><span class='fw-bold'>Phone Number:</span> " + park.Phone + "<br><span class='fw-bold'>Fax Number:</span> " + park.Fax + "<br><span class='fw-bold'>Coordinates:</span> " + park.Latitude + ", " + park.Longitude;
                visitBtn.style.display = "block";
                visitBtn.href = park.Visit;
                visitBtn.target = "_blank";
            }
        }
    }
    if(parkList.value != "select") {
        parkInfoJumbo.style.display = "block";
    }
    else {
        parkInfoJumbo.style.display = "none";
    }
}


// consider refactoring so that functions have parameters
// consider using .visually-hidden class instead of style.display.none to hide and unhide elements for acessibilty purposes in the future