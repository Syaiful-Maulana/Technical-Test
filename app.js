require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helper = require('./helpers/respon');
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(helper);
app.use(`${process.env.BASE_URL}`, route);

// if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App run on port ${PORT}`);
});
// }

module.exports = app;
