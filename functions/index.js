const functions = require("firebase-functions");
const finnhub = require('./routes/finnhub');
const { firebaseAdmin } = require('./firebase');

const db = firebaseAdmin.firestore();

exports.updateStockData = functions.https.onRequest(finnhub.updateStockData);