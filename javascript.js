
var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

$("#start-date").datepicker({

    uiLibrary: 'bootstrap4',
    minDate: today,  
    maxDate: function() {
        return $('#end-date').val();
    }
 }); 

 $('#end-date').datepicker({
    uiLibrary: 'bootstrap4',
    minDate: function () {
        return $('#start-date').val(); 
    }
 });

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


function displayBrewerys() {

    var city = $("#city-name").val().trim(); 
    var state = $("#state-name").val().trim(); 

    var queryURL = "https://api.openbrewerydb.org/breweries?by_state=" + state + "&by_city=" + city; 

        $.ajax({

        url: queryURL,
        method: "GET"

        }).then(function(response) {

        console.log(response);

        for (var i = 0; i < 3; i++) {

            var brewDiv = $("<div class='card-header'>");
            var brewName = response[i].name;
            var nameText = $("<h5>").html(response[i].name);

            brewDiv.append(brewName);
            $("#brewery-display").append(brewDiv); 
    
        }

     });
    
}


$(document).on("click", "#submitSearch", function() {

    event.preventDefault();

    $("#welcome-page").hide(); 

    displayBrewerys(); 

    getTicketmasterData(); 

});