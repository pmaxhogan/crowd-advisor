const { firebaseAdmin } = require('../firebase');
const functions = require("firebase-functions");
const dotenv = require('dotenv');
const finnhub = require('finnhub');
const { object } = require('firebase-functions/v1/storage');

dotenv.config();

const db = firebaseAdmin.firestore();
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

function getStockData (stockName) {
    // data for past 7 days
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

// convert stock data
function processStockCandle (data) {
    var processed = [];
    const nameMap = ['open', 'high', 'low', 'close', 'volume', 'time'];
    var j = -1;

    for (const [key, value] of Object.entries(data)) {
        j++;
        console.log(key, value);
        if (key == 's') break;
        value.forEach((dayData, i) => {
            if (!processed[i]) processed[i] = {};
            processed[i][nameMap[j]] = dayData;
        });
    }
    processed.forEach(day => day.day = new Date(day.time * 1000));

    return processed;
}

// get stock data and update the database
exports.updateStockData = async (req, res) => {
    try {
        const stockData = await getStockData(req.query.stock);
        const processed = processStockCandle(stockData);
        console.log(processed);
        await db.collection('stocks').doc(req.query.stock).set({ day_candles: processed }, { merge: true });
        res.status(200).json({ result: processed });
    } catch (error) {
        res.status(500).json({ result: 'updateStockData internal server error.' });
        console.error(error);
    }
}