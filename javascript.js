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

        for (var i = 0; i < 3; i++) {

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

                var card = $("<div>");
                var image = $("<img>");
                var cardBody = $("<div>");
                var cardTitle = $("<h5>");
                var unorderedList = $("<ul>");
                var listItemVenue = $("<li>");
                var listItemDate = $("<li>");
                var listItemTime = $("<li>");
                var linkToBuyTickets = $("<a>");
            
                card.addClass("card");
                image.addClass("card-img-top");
                cardBody.addClass("card-body");
                cardTitle.addClass("card-title");
                unorderedList.addClass("list-group list-group-flush");
                listItemVenue.addClass("list-group-item");
                listItemDate.addClass("list-group-item");
                listItemTime.addClass("list-group-item");
                linkToBuyTickets.addClass("card-link");
                
                image.attr("src", eventInfo.imageLink);
                image.attr("alt", eventInfo.eventName);
                cardTitle.text(eventInfo.eventName);
                listItemVenue.text("Venue: " + eventInfo.venue);
                listItemDate.text("Date: " + eventInfo.eventDate);
                listItemTime.text("Start Time: " + eventInfo.eventTime);
                linkToBuyTickets.attr("href", eventInfo.buyTicketLink);

                card.append(image);
                card.append(cardBody);
                card.append(cardTitle);
                card.append(unorderedList);
                card.append(listItemVenue);
                card.append(listItemDate);
                card.append(listItemTime);
                card.append(cardBody);
                card.append(linkToBuyTickets);

                $("#ticketmaster-display").append(card);

            };

            displayEventInfo(eventInfo);
        
        };

    });

};

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

};


$(document).on("click", "#submitSearch", function() {

    event.preventDefault();

    $("#welcome-page").hide(); 

    displayBrewerys(); 

    getTicketmasterData(); 

});