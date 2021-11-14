const functions = require("firebase-functions");
const finnhub = require('./routes/finnhub');
const twitter = require('./routes/twitter')
const { firebaseAdmin } = require('./firebase');

const db = firebaseAdmin.firestore();

exports.updateFinnhubData = functions.https.onRequest(finnhub.updateFinnhubData);
exports.updateSentimentTweetData = functions.https.onRequest(twitter.getSentimentAndTweetHistory);