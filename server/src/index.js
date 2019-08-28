const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./api/router.js');
const { server } = require('./config/config.json');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(server.port, () => {
  console.log(`Example app listening on port ${server.port}!`);
});
