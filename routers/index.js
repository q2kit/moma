const auth = require('./auth');

const routers = (app) => {
    app.use('/auth', auth);
    app.get('/', function (req, res) {
        res.send('Server is running');
    });
    // app.use((req, res) => {
    //     res.status(404).json({
    //         success: false,
    //         message: 'Page not found',
    //         code: 404
    //     });
    // });
}

module.exports = routers;