const dotenv = require('dotenv');
const finnhub = require('finnhub');

dotenv.config();

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

// date window for data updates
const prevDate = Date.now() - 30 * 1000 * 3600 * 24;
const nowDate = Date.now();

function getCandleData (symbol, isStock) {
    return new Promise((resolve, reject) => {
        if (isStock) {
            finnhubClient.stockCandles(symbol, 'D', Math.floor(prevDate / 1000), Math.floor(nowDate / 1000), (error, data, response) => {
                if (error) {
                    return reject(error);
                }
                const processed = processCandle(data);
                resolve(processed);
            });
        } else {
            finnhubClient.cryptoCandles(symbol, 'D', Math.floor(prevDate / 1000), Math.floor(nowDate / 1000), (error, data, response) => {
                if (error) {
                    return reject(error);
                }
                const processed = processCandle(data);
                resolve(processed);
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

function search (phrase) {
    return new Promise((resolve, reject) => {
        finnhubClient.symbolSearch(phrase, (error, data, response) => {
            if (error) {
                return reject(error);
            }
            try {
                var result = [];
                data.result.forEach((element, i) => {
                    result[i] = { name: element.description, symbol: element.displaySymbol }
                });
                resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    });
}

exports.getCandleData = getCandleData;
exports.getNews = getNews;
exports.getName = getName;
exports.search = search;