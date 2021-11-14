const Twitter = require("twitter");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const dotenv = require('dotenv');
dotenv.config();

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    bearer_token: process.env.BEARER_TOKEN
});

const dateToTwitterDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const daysAgoToDateRange = daysAgo => {
    const startRange = new Date();
    const endRange = new Date();

    startRange.setDate(startRange.getDate() - daysAgo);
    endRange.setDate(endRange.getDate() - (daysAgo - 1));

    console.log(daysAgo, startRange, endRange);

    return [dateToTwitterDate(startRange), dateToTwitterDate(endRange)];
};

const getSentimentForDay = (ticker, daysAgo) => new Promise((resolve, reject) => {
    const [since, until] = daysAgoToDateRange(daysAgo);
    const params = {q: `${ticker} until:${until} since:${since}`, result_type: "popular"};
    client.get('search/tweets', params, function(error, tweets, response) {
        if (error) {
            return reject(error);
        }else{
            console.log(tweets.statuses);

            tweets.statuses.map(tweet => {
                if(tweet.text) tweet.sentiment = sentiment.analyze(tweet.text);
                return tweet;
            });

            const tweetsWithSentiment = tweets.statuses.filter(tweet => tweet.sentiment && tweet.sentiment.comparative);
            const overallSentiment = tweetsWithSentiment.reduce((sum, obj) => sum + obj.sentiment.comparative, 0) / tweetsWithSentiment.length;
            const overallSentimentTransformed = Math.tanh(4 * overallSentiment);

            const mostPopularTweet = tweets.statuses.sort((a, b) => b.favorite_count - a.favorite_count)[0];

            return resolve({
                sentiment: overallSentimentTransformed,
                mostPopularTweet: mostPopularTweet.id_str
            });
        }
    });
});

const getSentimentAndTweetHistory = async ticker => {
    let daySentiment = [];
    let tweets = [];
    for(let day = 7; day >= 1; day--){
        const date = new Date();

        date.setDate(date.getDate() - day);
        console.log("day", day, date);
        const {sentiment, mostPopularTweet} = await getSentimentForDay(ticker, day);

        daySentiment.push({
            day: date,
            sentiment
        });

        tweets.push({
            day: date,
            mostPopularTweet
        });
    }

    return {daySentiment, tweets};
};

exports.getSentimentAndTweetHistory = getSentimentAndTweetHistory;