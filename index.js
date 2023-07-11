var express = require('express');
var app = express();
const routers = require('./routers');
const middlewares = require('./middlewares');

require('dotenv').config();

app.use(express.json());

// middlewares(app);
routers(app);

app.listen(3000);
