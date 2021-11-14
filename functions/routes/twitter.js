const { firebaseAdmin } = require('../firebase');
const functions = require("firebase-functions");
const { getSentimentAndTweetHistory } = require('../lib/twitter');
const db = firebaseAdmin.firestore();

// update twitter and sentiment data
exports.getSentimentAndTweetHistory = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const isStock = req.query.stock ? true : false;
        const collectionName = isStock ? 'stocks' : 'crypto';
        const symbol = isStock ? req.query.stock : req.query.crypto;
        const query = isStock ? symbol : (await db.collection(collectionName).doc(req.query.crypto).get()).data().searchName;
        const { daySentiment, tweets, mostPopularTweets } = await getSentimentAndTweetHistory(`$${query}`);
        await db.collection(collectionName).doc(symbol).set({ daySentiment: daySentiment, tweets: tweets, mostPopularTweets }, { merge: true });
        res.status(200).json({ result: `Successfully updated Firestore Database for ${symbol}` });
    } catch (error) {
        res.status(500).json({ result: 'getSentimentAndTweetHistory internal server error.' });
        console.error(error);
    }
}
