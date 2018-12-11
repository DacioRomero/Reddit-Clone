// utils/autopopulate.js
// https://stackoverflow.com/a/30052105/10336544
// Makes using posts easier as you almost always want author info
module.exports = field => {
    return function(next) {
        this.populate(field);
        next();
    }
}
