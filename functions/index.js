const functions = require("firebase-functions");
const finnhub = require('./routes/finnhub');
const { firebaseAdmin } = require('./firebase');

const db = firebaseAdmin.firestore();

exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await db.collection('messages').add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.updateStockData = functions.https.onRequest(finnhub.updateStockData);