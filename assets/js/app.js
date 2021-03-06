var endpoint = "https://api.giphy.com/v1/gifs/search";

var key = "8jNXGAzvOAK51LSOWXQSfBKOHmPYRM7H";
var limit = 10;
var rating = "PG-13";
var offset = 0;
var query;

var topics = [
  "cat",
  "dog",
  "snake",
  "chicken",
  "pig",
  "bird",
  "turtle",
  "ferret",
  "hedgehog",
  "serval",
  "frog"
];

function search(q) {
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
    q;
  $.ajax({
    url: queryUrl
  }).then(function(response) {
    $("#results .row").empty();
    response.data.forEach(imgObject => {
      var div = $("<div>").addClass("gif-container col-12 col-md-6 col-lg-4");
      var span = $("<span>")
        .text("Rating: " + imgObject.rating.toUpperCase())
        .addClass("gif-caption");
      var img = $("<img>")
        .addClass("gif")
        .attr("src", imgObject.images.downsized.url)
        .hide();
      var thumb = $("<img>")
        .addClass("gif-thumb")
        .attr("src", imgObject.images.downsized_still.url);
      div.append(span);
      div.append(img);
      div.append(thumb);
      $("#results .row").append(div);
    });
  });
}

function listTopics() {
  $("#topics").empty();
  for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>").addClass("btn btn-info");
    btn.attr("data-topic", topics[i]);
    btn.text(topics[i]);
    $("#topics").append(btn);
  }
}

$(document).ready(function() {
  listTopics();

  $("#submit").on("click", function() {
    query = $("#search input").val();
    topics.push(query);
    listTopics();
    search(query);
  });

  $("body").on("click", "img", function() {
    if ($(this).attr("class") === "gif-thumb") {
      $(this).hide();
      $(this)
        .prev()
        .show();
    } else if ($(this).attr("class") === "gif") {
      $(this).hide();
      $(this)
        .next()
        .show();
    }
  });

  $("body").on("click", "#topics .btn", function() {
    if ($("#topics .btn.active")) {
      $("#topics .btn.active").removeClass("active");
    }
    $(this).addClass("active");
    search($(this).attr("data-topic"));
  });
});
