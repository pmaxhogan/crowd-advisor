const { firebaseAdmin } = require('../firebase');
const functions = require("firebase-functions");
const dotenv = require('dotenv');
const finnhub = require('finnhub');

dotenv.config();

const db = firebaseAdmin.firestore();
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

// date window for data updates
const prevDate = Date.now() - 7 * 1000 * 3600 * 24;
const nowDate = Date.now();

function getCandleData (symbol, isStock) {
    return new Promise((resolve, reject) => {
        if (isStock) {
            finnhubClient.stockCandles(symbol, 'D', Math.floor(prevDate / 1000), Math.floor(nowDate / 1000), (error, data, response) => {
                if (error) {
                    return reject(error);
                }
                resolve(data);
            });
        } else {
            finnhubClient.cryptoCandles(symbol, 'D', Math.floor(prevDate / 1000), Math.floor(nowDate / 1000), (error, data, response) => {
                if (error) {
                    return reject(error);
                }
                resolve(data);
            });
        }
    });
}

// get company/crypto name from symbol
function getName (symbol) {
    return new Promise((resolve, reject) => {
        finnhubClient.symbolSearch(symbol, (error, data, response) => {
            if (error) {
                return reject(error);
            }
            try {
                const name = data.result.filter(data => data.symbol === symbol)[0].description;
                resolve(name);
            } catch (error) {
                return reject(error);
            }
        });
    });
}

const dateToNewsDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

function getNews (symbol) {
    return new Promise((resolve, reject) => {
        finnhubClient.companyNews(symbol, dateToNewsDate(new Date(prevDate)), dateToNewsDate(new Date(nowDate)), (error, data, response) => {
            if (error) {
                return reject(error);
            }
            resolve(data.slice(0, 10));
        });
    });
}

// convert stock data
function processCandle (data) {
    var processed = [];
    const nameMap = ['open', 'high', 'low', 'close', 'volume', 'time'];
    var j = -1;

    for (const [key, value] of Object.entries(data)) {
        j++;
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
        const symbol = req.query.symbol;
        const stockData = await getCandleData(symbol, true);
        const companyName = await getName(symbol);
        const newsData = await getNews(symbol);
        const processedData = processCandle(stockData);
        await db.collection('stocks').doc(symbol).set({ day_candles: processedData, name: companyName, news: JSON.parse(JSON.stringify(newsData)) }, { merge: true });
        res.status(200).json({ result: `Successfully updated Firestore Database for Stock ${symbol}` });
    } catch (error) {
        res.status(500).json({ result: 'updateStockData internal server error.' });
        console.error(error);
    }
}

// get crypto data and update the database
exports.updateCryptoData = async (req, res) => {
    try {
        const symbol = req.query.symbol;
        const cryptoData = await getCandleData(symbol, false);
        const cryptoName = await getName(symbol);
        const newsData = await getNews(symbol);
        const processedData = processCandle(cryptoData);
        await db.collection('crypto').doc(symbol).set({ day_candles: processedData, name: cryptoName, news: newsData }, { merge: true });
        res.status(200).json({ result: `Successfully updated Firestore Database for Crypto ${symbol}` });
    } catch (error) {
        res.status(500).json({ result: 'updateCryptoData internal server error.' });
        console.error(error);
    }
}