const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const streamClient = require('./streamClient');
const Store = require('./store');
const queries = require('./queries');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms'));
}

const store = new Store();
streamClient.on('send-email', campaign => (
  Promise.resolve(store.addCampaign(campaign))
));
streamClient.on('email-sent', campaign => (
  Promise.resolve(store.addSuccessfulRecipients(campaign))
));
streamClient.on('email-failed', campaign => (
  Promise.resolve(store.addFailedRecipients(campaign))
));
app.post('/events', streamClient.listen());

const { getCampaigns } = queries(store);
app.get('/api/campaigns', getCampaigns);

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
