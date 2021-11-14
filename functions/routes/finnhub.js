const { firebaseAdmin } = require('../firebase');
const functions = require("firebase-functions");
const { getName, getNews, getCandleData } = require('../lib/finnhub');
const db = firebaseAdmin.firestore();

// get stock data and update the database
exports.updateFinnhubData = async (req, res) => {
    try {
        const isStock = req.query.stock ? true : false;
        const symbol = isStock ? req.query.stock : req.query.crypto;
        const collectionName = isStock ? 'stocks' : 'crypto';
        const candleData = await getCandleData(symbol, isStock);
        const name = await getName(symbol);
        const newsData = await getNews(symbol);
        await db.collection(collectionName).doc(symbol).set({ day_candles: candleData, name: name, news: JSON.parse(JSON.stringify(newsData)) }, { merge: true });
        res.status(200).json({ result: `Successfully updated Firestore Database for ${symbol}` });
    } catch (error) {
        res.status(500).json({ result: 'updateFinnhubData internal server error.' });
        console.error(error);
    }
}