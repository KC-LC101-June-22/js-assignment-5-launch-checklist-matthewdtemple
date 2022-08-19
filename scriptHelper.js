// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    document.getElementById("missionTarget").innerHTML =
        `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
            `

}

function validateInput(testInput) {
    if (!testInput) {
        return "Empty"
    } else if (isNaN(testInput)) {
        return "Not a number"
    } else {
        return "Is a number"
    }

}
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields required!")
    } else if (validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number") {
        alert("Pilot and copilot cannot contain numbers.")
    } else if (validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a number") {
        alert("Fuel and Cargo must be a number")
    }

    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let fuelStatus = document.getElementById("fuelStatus")
    let cargoStatus = document.getElementById("cargoStatus")

    let launchStatus = document.getElementById("launchStatus")
    let docVisiblity = document.getElementById("faultyItems")

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`

    if (fuelLevel < 10000 && cargoLevel > 10000) {
        docVisiblity.style.visibility = "visible"
        launchStatus.innerHTML = "Shuttle not ready for launch"
        launchStatus.style.color = "red"
        fuelStatus.innerHTML = "Not enough fuel for mission"
        cargoStatus.innerHTML = "Too much cargo, weight limit exceeded"
    }else if (cargoLevel > 10000){
        docVisiblity.style.visibility = "visible"
        launchStatus.innerHTML = "Shuttle not ready for launch"
        launchStatus.style.color = "red"
        cargoStatus.innerHTML = "Too much cargo, weight limit exceeded"
        fuelStatus.innerHTML = "Fuel level high enough for launch"
    } else if (fuelLevel < 10000) {
        docVisiblity.style.visibility = "visible"
        launchStatus.innerHTML = "Shuttle not ready for launch"
        launchStatus.style.color = "red"
        fuelStatus.innerHTML = "Not enough fuel for mission"
        cargoStatus.innerHTML = "Cargo mass low enough for launch"
    } else {
        launchStatus.innerHTML = "Shuttle ready for launch"
        launchStatus.style.color = "green"
    }


    

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planNum = Math.floor(Math.random() * planets.length)
    return planets[planNum]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;