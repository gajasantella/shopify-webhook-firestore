app.post('/shopify-webhook-order', (req, res) => {
  console.log('Webhook ricevuto:', req.body);
  res.status(200).json({message: "Ricevuto", body: req.body});
});
