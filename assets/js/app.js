var endpoint = "https://api.giphy.com/v1/gifs/search";

var key = "8jNXGAzvOAK51LSOWXQSfBKOHmPYRM7H";
var limit = 25;
var rating = "PG-13";
var offset = 0;
var query;

var topics = [];

function search(url) {
  $.ajax({
    url: url
  }).then(function(response) {
    console.log(response.data);
    response.data.forEach(imgObject => {
      var div = $("<div>").addClass("gif-container col-4");
      var span = $("<span>")
        .text("Rating: " + imgObject.rating.toUpperCase())
        .addClass("gif-caption");
      var img = $("<img>")
        .addClass("gif")
        .attr("src", imgObject.images.downsized.url);
      div.append(span);
      div.append(img);
      $("#results .row").append(div);
    });
  });
}

$(document).ready(function() {
  $("#submit").on("click", function() {
    query = $("#search input").val();

    var queryUrl =
      endpoint +
      "?api_key=" +
      key +
      "&limit=" +
      limit +
      "&offset" +
      offset +
      "&rating=" +
      rating +
      "&q=" +
      query;

    search(queryUrl);
  });
});
