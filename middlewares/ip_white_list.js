const ip_white_list = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    lst = [
        '1.2.3.4',
        '2.3.4.5'
    ]
    if (lst.includes(ip)) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

module.exports = ip_white_list;
