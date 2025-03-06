const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const app = express();
app.use(express.json());

app.post('/shopify-webhook-order', async (req, res) => {
  const order = req.body;

  await firestore.collection('orders').doc(`${order.id}`).set({
    orderId: order.id,
    orderStatus: 'pending',
    customerEmail: order.email,
    requirementsReceived: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    deliveredFiles: []
  });

  res.status(200).send('Webhook ricevuto!');
});

app.get('/', (req,res)=> {
  res.send('Webhook Shopify pronto!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Webhook Shopify attivo');
});
