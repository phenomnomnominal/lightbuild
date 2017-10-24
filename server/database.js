// Dependencies:
const Datastore = require('nedb');

const DB = new Datastore({ filename: './subscriptions.db', autoload: true });

module.exports = {
    check,
    find,
    insert
};

function check (subscription) {
    return new Promise((resolve, reject) => {
        DB.find(subscription, (err, subscriptions) => {
            if (err) {
                return reject(err);
            }
            resolve(!!subscriptions.length);
        });
    });
}

function find () {
    return new Promise((resolve, reject) => {
        DB.find({}, (err, subscriptions) => {
            if (err) {
                return reject(err);
            }
            resolve(subscriptions);
        });
    });
}

function insert (object) {
    return new Promise((resolve, reject) => {
        DB.insert(object, (err, doc) => {
            if (err) {
                return reject(err);
            }
            resolve(doc._id);
        });
    });
}
