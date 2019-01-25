
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

})

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

function datePicker () {

    $('input[name="daterange"]').daterangepicker({
    opens: 'left'

    }, function(start, end, label) {   
        var startFormatted = start.format('YYYY-MM-DD');
        var endFormatted = end.format('YYYY-MM-DD');
        console.log("A new date selection was made: " + startFormatted + ' to ' + endFormatted);
        $("#datePicker").attr("value", startFormatted + ' to ' + endFormatted);
        //you can use startFormatted & endFormatted to filter the data
    });
}
datePicker();

$(document).on("click", "#submitSearch", function() {
    
    event.preventDefault();

    displayBrewerys(); 

});