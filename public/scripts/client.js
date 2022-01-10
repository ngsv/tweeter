/* eslint-env jquery */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

      <p class="tweet-article-tweet">${tweet.content.text}</p>
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
    $('#tweets-container').append($tweet);
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

loadTweets();



$(document).ready(function() {

  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    // const inputBox = $(this).children('#tweet-text');
    // const newTweet = inputBox.val();
    // console.log(newTweet);
    console.log($(this).serialize());
    // console.log(event);
    //
    let data = $(this).serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data
    })
      .done(results => console.log(results))
      .fail(error => console.log(`Error: ${error.message}`));

  });
});
