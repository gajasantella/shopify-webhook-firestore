const express = require('express');
const app = express();
app.use(express.json());

app.post('/shopify-webhook-order', (req, res) => {
  console.log('Webhook ricevuto:', req.body);
  res.status(200).send('OK');
});

app.listen(process.env.PORT || 3000);
