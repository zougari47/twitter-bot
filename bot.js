const twit = require('./twit');
const QUERY = 'Day AND #100DaysOfCode';

const getTweets = async () => {
  return new Promise((resolve, reject) => {
    let params = {
      q: QUERY,
      f: 'live',
      count: 5
    };
    twit.get('search/tweets', params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const retweet = async id => {
  return new Promise((resolve, reject) => {
    twit.post('statuses/retweet/:id', { id }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const main = async () => {
  try {
    const data = await getTweets();
    const tweets = data.statuses;
    console.log(`We got ${tweets.length} tweet`);

    for await (let tweet of tweets) {
      try {
        await retweet(tweet.id_str);
        console.log(`✅ Retweet ${tweet.id_str} successfully`);
      } catch (err) {
        console.error(`❌ Retweet ${tweet.id_str} failed`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = main;
