const express = require('express');
const bodyParser = require('body-parser');
const streamClient = require('./streamClient');
const Store = require('./store');
const queries = require('./queries');

const app = express();
app.use(bodyParser.json());

const store = new Store();
streamClient.on('send-email', campaign => (
  Promise.resolve(store.addCampaign(campaign))
));
app.post('/events', streamClient.listen());

const { getCampaigns } = queries(store);
app.get('/api/campaigns', getCampaigns);

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Listening on port', port);
});
