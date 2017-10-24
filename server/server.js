// Dependencies:
const bodyParser = require('body-parser');
const express = require('express');
const { isValidSubscription, saveSubscription } = require('./push');

// Constants:
const APP = express();

module.exports = {
    start
};

function start () {
    APP.use(bodyParser.json());
    APP.use(express.static('dist'));

    APP.post('/api/save-subscription/', async (req, res) => {
        if (!isValidSubscription(req.body)) {
            res.status(400);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                error: {
                    id: 'no-endpoint',
                    message: 'Subscription must have an endpoint.'
                }
            }));
            return;
        }

        try {
            await saveSubscription(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true }));
        } catch (e) {
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                error: {
                    id: 'unable-to-save-subscription',
                    message: 'The subscription was received but we were unable to save it to our database.'
                }
            }));
            return;
        }
    });

    APP.listen(3000, () => {
        console.log('💡 lightbuild listening...');
    });
}
