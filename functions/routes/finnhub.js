const { firebaseAdmin } = require('../firebase');
const functions = require("firebase-functions");
const { getName, getNews, getCandleData, search } = require('../lib/finnhub');
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

// search for stock/crypto and return a list of names and symbols
exports.searchPhrase = async (req, res) => {
    try {
        const result = await search(req.query.phrase);
        res.status(200).json({ result: result });
    } catch (error) {
        res.status(500).json({ result: 'searchPhrase internal server error.' });
        console.error(error);
    }
}