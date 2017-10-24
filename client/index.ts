// Dependencies:
import * as bulb from './bulb';
import { transitionColor } from './colors';
import { askPermission, subscribeClient, subscribeServer } from './notifications';
import './messages';

// Constants:
const SERVICE_WORKER_SCRIPT = 'service-worker.js';

(async () => {
    let registration = await navigator.serviceWorker.register(SERVICE_WORKER_SCRIPT);
    let subscription = await subscribeClient(registration);
    await askPermission();
    await subscribeServer(subscription);
})();

let connectButton = document.getElementById('connect');
connectButton.addEventListener('click', connect);

let disconnectButton = document.getElementById('disconnect');
disconnectButton.addEventListener('click', disconnect);

async function connect () {
    await bulb.connect();

    let input = document.querySelector('input');
    input.addEventListener('change', transitionColor(10));
}

async function disconnect () {
    await bulb.disconnect();
}
