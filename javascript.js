
function getTicketmasterData () {

    var cityName = $("#city-name").val().trim().split(" ").join("+");
    var stateName = $("#state-name").val().trim().split(" ").join("+")

    console.log(cityName);
    console.log(stateName);

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=QZRsgKsNDgOLAvshwXSGPyRAHB3ImEda&size=3&city=" + cityName + "&stateCode=" + stateName;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log (response);
      });

}

$(document).on("click", "#submitSearch", function () {

  event.preventDefault();

  getTicketmasterData();


function displayBrewerys() {

    var city = $("#city-name").val().trim(); 

    var state = $("#state-name").val().trim(); 

    var queryURL = "https://api.openbrewerydb.org/breweries?by_state=" + state + "&by_city=" + city; 

        $.ajax({

        url: queryURL,
        method: "GET"

        })

        .then(function(response) {

        console.log(response); 

        });

}

$(document).on("click", "#submitSearch", function() {

    event.preventDefault();

    displayBrewerys(); 

});