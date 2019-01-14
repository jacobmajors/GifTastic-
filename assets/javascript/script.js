//initial array of tv shows

var shows = ["The Young Pope", "The Sopranos", "The Wire", "Breaking Bad", "Treme", "Mad Men", "Deadwood", "Six Feet Under", "Curb Your Enthusiasm", "Hello Ladies", "Seinfeld", "The Walking Dead", "Hell On Wheels", "Band of Brothers", "Suburra", "Freaks and Geeks", "Game of Thrones", "Rome", "Dexter", "True Detective", "Bloodline"];

function renderButtons() {
    // Deleting the shows prior to adding new shows
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of shows
    for (var i = 0; i < shows.length; i++) {
      // Dynamicaly generating buttons for each show in the array
      var a = $("<button>");
      // Adding a class of show-btn to our button
      a.addClass("show-btn");
      // Adding a data-attribute
      a.attr("data-name", shows[i]);
      // Providing the initial button text
      a.text(shows[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
}

$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var show = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var showImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            showImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(showImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

