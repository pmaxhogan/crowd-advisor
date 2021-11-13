const { firebaseAdmin } = require('../firebase');
const functions = require("firebase-functions");
const dotenv = require('dotenv');
const finnhub = require('finnhub');

dotenv.config();

const db = firebaseAdmin.firestore();
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

function getStockData (stockName) {
    const prevDate = Math.floor((Date.now() - (7 * 1000 * 3600 * 24)) / 1000);
    const nowDate = Math.floor(Date.now() / 1000);

    return new Promise((resolve, reject) => {
        finnhubClient.stockCandles(stockName, 'D', prevDate, nowDate, (error, data, response) => {
            if (error) {
                return reject(error);
            }
            resolve(data);
        });
    });
}

exports.updateStockData = async (req, res) => {
    try {
        const stockData = await getStockData(req.query.stock);
        const stock = await db.collection('stocks').doc(req.query.stock).set(JSON.parse(JSON.stringify(stockData)));
        res.status(200).json({ result: stockData });
    } catch (error) {
        res.status(500).json({ result: 'updateStockData internal server error.' });
        console.error(error);
    }
}