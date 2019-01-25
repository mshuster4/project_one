

function displayBrewerys() {


        var city = $("#city-name").val().trim(); 

        var state = $("#state-name").val().trim(); 

        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city; 

            $.ajax({

            url: queryURL,
            method: "GET"

            })

            .then(function(response) {

            console.log(response); 

            });

    }


$("#submitSearch").on("click", displayBrewerys()); 
