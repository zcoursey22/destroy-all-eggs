const twit = require('twit');
// const twitterCreds = require('./config.js');

let config = {
  consumer_key: process.env.BOT_CONSUMER_KEY ||  twitterCreds.consumer_key,
  consumer_secret: process.env.BOT_CONSUMER_SECRET || twitterCreds.consumer_secret,
  access_token: process.env.BOT_ACCESS_TOKEN || twitterCreds.access_token,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET || twitterCreds.access_token_secret
};

const Twit = new twit(config);

var stream = Twit.stream('statuses/filter', { track: ['@DestroyAllEggs'] });

var replyToAt = (tweet) => {
  var atName = tweet.user.screen_name;
  var tweetId = tweet.id_str;
  var reply = `Yo @${atName}! Thanks for not being an egg!`;

  if (tweet.user.profile_image_url === 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png') {
    reply = `Don't be an egg, @${atName}! Go give yourself a real profile picture!`;
  };

  var params = { status: reply, in_reply_to_status_id: tweetId };

  if (tweet.user.screen_name !== 'DestroyAllEggs') {
    Twit.post('statuses/update', params, (err, data, response) => {
      console.log('replied:', params.status);
    });
  };
};

stream.on('tweet', replyToAt);
