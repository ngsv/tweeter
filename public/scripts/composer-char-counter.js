/* eslint-env es6 */

$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let count = $(".footer").find(".counter"); // Target the counter
    let textCount = $(this).val().length;
    let countUpdate = 140 - textCount;

    $(count.val(140 - textCount)); // Update counter as tweet is composed

    if (countUpdate < 0) { // Change font to red if counter is less than 0 and back to grey if greater than or equal to 0
      $(count).css("color", "red");
    } else {
      $(count).css("color", "#545149");
    }
  });
}); // document ready
