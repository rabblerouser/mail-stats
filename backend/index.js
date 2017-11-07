const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Listening on port', port);
});
