/* eslint-env jquery */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Escape Function
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const $tweet = $(`
    <article class="tweet-article">

      <header class="tweet-header">
        <div class="tweet-user">
          <img src="${tweet.user.avatars}">
          <h3 class="tweet-article-name">${tweet.user.name}</h3>
        </div>
        <h3 class="tweet-article-handle">${tweet.user.handle}</h3>
      </header>

      <p class="tweet-article-tweet">${escape(tweet.content.text)}</p>
      <hr>

      <footer class="tweet-footer">

        <p class="footer-date">
            ${timeago.format(tweet.created_at)}
        </p>

        <div class="footer-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>

      </footer>

    </article>
  `);
  return $tweet;
};

const renderTweets = (tweets) => {
  for (let i = 0; i < tweets.length; i++) {
    let $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').prepend($tweet);
  }
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
    .done((results) => {
      renderTweets(results);
    })
    .fail(error => console.log(`Error: ${error.message}`));
};

const postTweet = (data) => {
  $(".error-msg").slideUp(400);
  if (data === "text=" || data === null) {
    $(".msg2").delay(400).slideDown(400);
  } else if (data.length > 140) {
    $(".msg1").delay(400).slideDown(400);
  } else {

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
    })
      .done(() => {
        $.ajax({
          url: '/tweets',
          method: 'GET',
        })
          .done((tweets) => {
            let postedTweet = [tweets[tweets.length - 1]];
            renderTweets(postedTweet);
          })
          .fail(error => console.log(`Error: ${error.message}`));
      })
      .fail(error => console.log(`Error: ${error.message}`));
  }
};

loadTweets();



$(document).ready(function() {

  $(".error-msg").hide();

  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());

    let data = $(this).serialize();
    postTweet(data);

  });
});
