

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