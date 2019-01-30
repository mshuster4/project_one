var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

$("#start-date").datepicker({
    uiLibrary: 'bootstrap4',
    iconsLibrary: 'fontawesome',
    minDate: today,  
    maxDate: function() {
        return $('#start-date').val();
    }
}); 

$('#end-date').datepicker({
    uiLibrary: 'bootstrap4',
    iconsLibrary: 'fontawesome',
    minDate: function () {
        return $('#end-date').val(); 
    }
});


function getTicketmasterData () {
    var startDateURL = moment($('#start-date').val()).toISOString().split('.')[0]+"Z" ;
    var endDateURL = moment($('#end-date').val()).toISOString().split('.')[0]+"Z" ;
    var cityName = $("#city-name").val().trim().split(" ").join("+");
    var stateName = $("#state-name").val().trim().split(" ").join("+")
 

    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var endpointUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=QZRsgKsNDgOLAvshwXSGPyRAHB3ImEda&city=" + cityName + "&stateCode=" + stateName + "&startDateTime=" + startDateURL + "&endDateTime=" + endDateURL + "&size=12";
    var fullUrl = corsProxy + endpointUrl;

    console.log(cityName);
    console.log(stateName);


    //var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=QZRsgKsNDgOLAvshwXSGPyRAHB3ImEda&size=3";
    console.log ('fullUrl',fullUrl);

    
    $.ajax({
        url: fullUrl,
        method:"GET",
      }).then(function(response) {

        console.log ('ticketmaster',response);


        for (var i = 0; i < 6; i++) {

            var eventInfo = { 
                imageLink: response._embedded.events[i].images[i].url,
                eventName: response._embedded.events[i].name,
                venue: response._embedded.events[i]._embedded.venues[0].name,
                eventDate: response._embedded.events[i].dates.start.localDate,
                eventTime: response._embedded.events[i].dates.start.localTime,
                buyTicketLink: response._embedded.events[i].url
            };

            console.log(eventInfo);


            function displayEventInfo (eventInfo) {

                console.log(eventInfo)

                var cardCol = $("<div>")
                var card = $("<div>");
                var image = $("<img>");
                var cardBody = $("<div>");
                var cardTitle = $("<h5>");
                var unorderedList = $("<ul>");
                var listItemVenue = $("<li>");
                var listItemDate = $("<li>");
                var listItemTime = $("<li>");
                var linkToBuyTickets = $("<a>");
                
                cardCol.addClass("col-sm-4"); 
                card.addClass("card text-center");
                image.addClass("card-img");
                cardBody.addClass("card-body");
                cardTitle.addClass("card-title");
                unorderedList.addClass("list-group list-group-flush");
                listItemVenue.addClass("list-group-item");
                listItemDate.addClass("list-group-item");
                listItemTime.addClass("list-group-item");
                linkToBuyTickets.addClass("card-link list-group-item link");
                
                image.attr("src", eventInfo.imageLink);
                image.attr("alt", eventInfo.eventName);
                cardTitle.text(eventInfo.eventName);
                listItemVenue.text("Venue: " + eventInfo.venue);
                listItemDate.text("Date: " + eventInfo.eventDate);
                listItemTime.text("Start Time: " + eventInfo.eventTime);
                linkToBuyTickets.attr("href", eventInfo.buyTicketLink);
                linkToBuyTickets.text("Get Tickets"); 

                cardCol.append(card); 
                cardBody.appendTo(card);
                cardTitle.appendTo(cardBody); 
                image.appendTo(card);
                unorderedList.appendTo(card);
                listItemVenue.appendTo(unorderedList);
                listItemDate.appendTo(unorderedList);
                listItemTime.appendTo(unorderedList);
                linkToBuyTickets.appendTo(unorderedList);

                $("#ticketmaster-display").append(cardCol);

            };

            displayEventInfo(eventInfo);
        };

    }).catch(function(error){console.warn(error)});

};

function getBrewerys() {

    var city = $("#city-name").val().trim(); 
    var state = $("#state-name").val().trim(); 


    var URL = "https://api.openbrewerydb.org/breweries?by_state=" + state + "&by_city=" + city; 

        $.ajax({

        url: URL,
        method: "GET"

        }).then(function(response) {

        console.log(response);

        for (var i = 0; i < 6; i++) {

            var brewInfo = { 
                name : response[i].name,
                street : response[i].street,
                city: response[i].city,
                state: response[i].state,
                website : response[i].website_url
            };


            function displayBrewInfo(brewInfo) {

                console.log(brewInfo)

                var brewCardCol = $("<div>")
                var brewCard = $("<div>");
                var brewCardBody = $("<div>");
                var brewCardTitle = $("<h5>");
                var brewUnorderedList = $("<ul>");
                var listBrewStreet = $("<li>"); 
                var linkBrewWebsite = $("<a>");
                
                brewCardCol.addClass("col-sm-4")
                brewCard.addClass("card text-center");
                brewCardBody.addClass("card-body");
                brewCardTitle.addClass("card-title");
                brewUnorderedList.addClass("list-group list-group-flush list");
                listBrewStreet.addClass("list-group-item");
                linkBrewWebsite.addClass("list-group-item card-link link");
                
                
                brewCardTitle.text(brewInfo.name);
                listBrewStreet.text(brewInfo.street + " " + brewInfo.city + ", " + brewInfo.state); 
                linkBrewWebsite.attr("href", brewInfo.website);
                linkBrewWebsite.text("Website");

                brewCardCol.append(brewCard)
                brewCardBody.appendTo(brewCard);
                brewCardTitle.appendTo(brewCardBody); 
                brewUnorderedList.appendTo(brewCard);
                listBrewStreet.appendTo(brewUnorderedList); 
                linkBrewWebsite.appendTo(brewUnorderedList);

                $("#brewery-display").append(brewCardCol); 

            };

            displayBrewInfo(brewInfo);
        
        };

    });

}; 

function updateDOM() {

    var brewsHeader = $("#brews-header")
    var beatsHeader = $("#beats-header")
    

    brewsHeader.text("Brews");
    beatsHeader.text( "BEATS");

    brewsHeader.css("font-family", "brewFont");
    beatsHeader.css("font-family", "beatsFont");
    
    brewsHeader.addClass("brews-header");
    beatsHeader.addClass("beats-header");

    var resetButton = $("<button>");
    resetButton.text("SEARCH AGAIN");
    resetButton.attr("type", "submit");
    resetButton.addClass("reset-button btn btn-primary");
  
    $("#reset-button").append(resetButton); 

}


function resetButton(){
    $("#start-date").val("");
    $("#end-date").val("");
    $("#city-name").val("");
    $("#state-name").val("");
    $("#state-name").empty();
    $("#brewery-display").empty();
    $("#beats-header").empty();
    $("#ticketmaster-display").empty();

    $("#reset-button").empty();
    
    $("#content-page").hide();
    
    $("#welcome-page").show();

}

$(document).on("click", "#submitSearch", function() {

    event.preventDefault();

    $("#welcome-page").hide(); 
    $("#content-page").show();
    getBrewerys(); 
    getTicketmasterData(); 

    updateDOM();
    

});

$(document).on("click", "#reset-button", function() {
    resetButton();
    
});