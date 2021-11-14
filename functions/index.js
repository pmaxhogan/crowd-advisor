const functions = require("firebase-functions");
const finnhub = require('./routes/finnhub');
const twitter = require('./routes/twitter');

// twitter routes
exports.updateSentimentTweetData = functions.https.onRequest(twitter.getSentimentAndTweetHistory);

// finnhub routes
exports.updateFinnhubData = functions.https.onRequest(finnhub.updateFinnhubData);
exports.searchPhrase = functions.https.onRequest(finnhub.searchPhrase);