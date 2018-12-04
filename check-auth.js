module.exports = (req, res, next) => {
    if (req.user == null) {
        return res.status(401).render('unauthorized');
    }
    next();
}
