/* eslint-env es6 */
/* eslint-disable */

$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let count = $(".footer").find(".counter");
    let textCount = $(this).val().length;
    let countUpdate = $(count.val(140 - textCount));

    if (Number(countUpdate.val()) < 0) {
      $(count).css("color", "red");
    } else {
      $(count).css("color", "#545149");
    };

  });
});
