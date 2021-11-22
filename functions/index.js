const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
    ('sk_test_51JZrQMSJRl1m3ljv0iWlDbZmJNkiAhRjGIjwWi4HFWh74GTcfOkBV22iIj6HOBgqmeqBlUmBIN3pbr7TExwd9EJI00avsgKtvJ')

// Api

// App config
const app = express()
// middleWare
app.use(cors({ origin: true }))
app.use(express.json())
// Api routes
app.get("/", (request, response) => response.status(200).send('hello world'))
// listen command

app.post("/payments/create", async (request, response) => {
    const total = request.query.total
    console.log('payment request recieved boom', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    })

    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})
exports.api = functions.https.onRequest(app);

// exports.api = functions.https.onRequest(app);
// http://localhost:5001/clone-dd608/us-central1/api