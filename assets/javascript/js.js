// Initial array of tvShows
var tvShowsArray = ["Friday Night Lights", "Dexter", "Castle Rock", "Desperate Housewives", "Homeland", "Family Guy", "It's always Sunny in Philedelphia", "The Handmaid's Tale", "Game of Thrones", "Queer as Folk", "Breaking Bad", "The Originals", "Orange is the New Black", "The Vampire Diaries", "That 70's Show", "Weeds", "Law & Order", "Wayward Pines", "Parks and Rec", "Friends", "The Office", "Roseanne", "Full House"];



window.onload = function () {
    renderButtons();
};

function renderButtons() {
    $("#tvShowButtons").empty();
    // Loops through the array of TV Shows
    for (var i = 0; i < tvShowsArray.length; i++) {
        // Dynamicaly generates buttons for each TV Show in the array
        var newButton = $("<button>");
        // Adds a class of movie to our button
        newButton.addClass("btn btn-primary dynamicButtons");
        // Added a data-attribute
        newButton.attr("data-name", tvShowsArray[i]);
        // Provided the initial button text
        newButton.text(tvShowsArray[i]);
        // Added the button to the buttons-view div
        $("#tvShowButtons").append(newButton);

    }
};


// generateGif function re-renders the HTML to display the appropriate content
function generateGif() {

    var tvShow = $(this).attr("data-name");
    var numberOfGifs = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific tv show button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var i = 0; i < tvShowsArray.length; i++) {

            // Creates a div to hold gifs for each tv show in array
            var gifDiv = $("<div>");
            gifDiv.addClass("gifContainer");

            //Retrieves gif data for each tv show in array and assigns retrieved data's src and data attributes and then appends it to an img  
            var gif = $("<img>");
            gif.attr("src", response.data[i].images.original_still.url);
            gif.attr("data-still", response.data[i].images.original_still.url);
            gif.attr("data-animate", response.data[i].images.original.url);
            gif.attr("data-state", "still");
            gif.attr("class", "gif");
            gifDiv.append(gif);

            // Retrieves the rating for each tv show in the array
            var rating = response.data[j].rating;
            console.log(response);
            // Creates an element to hold the rating
            var ratingText = $("<p>").text("Rating: " + rating);
            // Appends the rating
            gifDiv.append(ratingText);

            $("#tvShows").append(gifDiv);
            

        };

    });

}



// // This function handles events where the add movie button is clicked
// $("#add-movie").on("click", function (event) {
//     event.preventDefault();
//     // This line of code will grab the input from the textbox
//     var movie = $("#movie-input").val().trim();

//     // The movie from the textbox is then added to our array
//     movies.push(movie);

//     // Calling renderButtons which handles the processing of our movie array
//     renderButtons();
// });

// // Adding click event listeners to all elements with a class of "movie"
// $(document).on("click", ".movie", displayMovieInfo);

// // Calling the renderButtons function to display the intial buttons
// renderButtons();