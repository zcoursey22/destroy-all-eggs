const twit = require('twit');
// const config = require('./config.js');

let config = {
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
};
const Twit = new twit(config);

var stream = Twit.stream('statuses/filter', { track: ['DestroyAllEggs'] });

var replyToAt = (tweet) => {
  var reply = `Hello ${tweet.user.name}`;

  if (tweet.user.profile_image_url === 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png') {
    reply = `Don't be an egg, ${tweet.user.name}! Go give yourself a real profile picture!`;
  };

  var params = { status: reply, in_reply_to_status_id: tweet.id_str };

  Twit.post('statuses/update', params, function(err, data, response) {
    console.log('replied');
  });
};

stream.on('tweet', replyToAt);
