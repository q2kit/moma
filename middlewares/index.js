const ip_white_list = require('./ip_white_list');

const middlewares = (app) => {
    app.use(ip_white_list);
}

module.exports = middlewares;
