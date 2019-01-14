window.onload = function () {

// Initial array of tvShows
var tvShowsArray = ["Friday Night Lights", "Dexter", "Castle Rock", "Desperate Housewives", "Homeland", "Family Guy", "It's always Sunny in Philedelphia", "The Handmaid's Tale", "Game of Thrones", "Queer as Folk", "Breaking Bad", "The Originals", "Orange is the New Black", "The Vampire Diaries", "That 70's Show", "Weeds", "Law & Order", "Wayward Pines", "Parks and Rec", "Friends", "The Office", "Roseanne", "Full House"];



// generateGif function re-renders the HTML to display the appropriate content
function generateGif() {
    $("#tvShows").empty();

    var tvShow = $(this).attr("data-name");
    var numberOfGifs = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&limit=" + numberOfGifs + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific tv show button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response)

        for (var i = 0; i < numberOfGifs; i++) {

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
            var rating = response.data[i].rating;
            console.log(response);
            // Creates an element to hold the rating
            var ratingText = $("<p>").text("Rating: " + rating);
            // Appends the rating
            gifDiv.append(ratingText);
            // Appends the container of gifs to display in the html
            $("#tvShows").append(gifDiv);
            

        };

    });

}


function createButtons() {
    $("#tvShowButtons").empty();
    // Loops through the array of TV Shows
    for (var i = 0; i < tvShowsArray.length; i++) {
        // Dynamicaly generates buttons for each TV Show in the array
        var newButton = $("<button>");
        // Adds a class of movie to our button
        newButton.addClass("btn btn-primary dynamicButtons");
        // Adds an id to the buttons
        newButton.attr("id", "showInput");
        // Added a data-attribute
        newButton.attr("data-name", tvShowsArray[i]);
        // Provided the initial button text
        newButton.text(tvShowsArray[i]);
        // Added the button to the buttons-view div
        $("#tvShowButtons").append(newButton);

    }
};


function changeImgState(){
    //store the image's data-state into a variable called state
    var state = $('.gif').attr('data-state');
    console.log(state);

    //stores this into a variable called gifButton and adds a src attribute called data-state
      var gifButton = $(this);
      gifButton.attr('src', 'data-state');

      //Checks if the variable state is equal to 'still',
      if(state === 'still'){
        //updates the src attribute of this image to it's data-animate value  
        gifButton.attr('src', gifButton.attr('data-animate'));
        //updates the data-state attribute to 'animate'.
        gifButton.attr('data-state', 'animate');
    
      }
      //// If state is equal to 'animate',
      else if(state === 'animate'){
          //update the src attribute of this to it's data-still value
        gifButton.attr('src', gifButton.attr('data-still'));
        //updates the data-state attribute to 'still'.
        gifButton.attr('data-state', 'still');
      }

};


$("#addTvShow").on("click", function(event){
    event.preventDefault();
    //This line of code will grab the input from the textbox
    var userInput = $("#tvShowInput").val().trim();
    tvShowsArray.push(userInput);
    showForm.reset();
    
    // Calling createButtons which handles the processing of the tvShowArray
    createButtons();

    // return false;
});


// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", "#showInput", generateGif);
$(document).on("click", ".gif", changeImgState);

// Calling the createButtons function to display the intial buttons
createButtons();


};//end of window on load function