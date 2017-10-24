// Dependencies:
const webpush = require('web-push');
const { check, find, insert } = require('./database');

module.exports = {
    isValidSubscription,
    saveSubscription,
    sendNotification
};

(async () => {
    try {
        await webpush.setVapidDetails(
            process.env.VAPID_HOST,
            process.env.VAPID_PUB,
            process.env.VAPID_PRI
        );
    } catch (error) {
        console.log(error);
    }
})();

function isValidSubscription (body) {
    return body && body.endpoint;
};

async function saveSubscription (subscription) {
    if (!await check(subscription)) {
        await insert(subscription);
        sendNotification('SUBSCRIBED');
    } else {
        sendNotification('CONNECTED');
    }
}

async function sendNotification (type, data) {
    let subscriptions = await find()
    subscriptions.forEach(subscription => {
        webpush.sendNotification(subscription, JSON.stringify({ type, data }));
    });
}
