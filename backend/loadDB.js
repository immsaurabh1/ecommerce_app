var mongoose = require('mongoose')
var assert = require('assert')
global._config = require('./config');
global._models = require('./models');

mongoose.connect(_config.get('db').uri, _config.get('db').options)
    .then(connection => {
        return loadDb();
    })
    .then(() => console.log('Insert complete'))
    .catch(err => {
        console.error('Unable to connect to database. Aborting data seeding.', err);
    });;
function loadDb() {
    const keys = ['User', 'Category', 'Product'];
    const promises = [];
    keys.forEach(action => {
        let data = require(`./models/data/${action.toLowerCase()}.json`);
        promises.push(_models[action].insertMany(data));
    });
    return Promise.all(promises);
}