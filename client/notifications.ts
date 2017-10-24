// Constants:
const GRANTED = 'granted';
const SAVE_ENDPOINT = '/api/save-subscription/';
const SERVER_KEY = 'BEulPIq2r35OhhGXa507LqtVGgLD_n3-LPzsabJaS4dCPbVqePG_muBQpt5-wx8gCOoSMB_iNOBAuaRGa99_n7k';

export async function askPermission () {
    let permission = await Notification.requestPermission();
    if (permission !== GRANTED) {
        throw new Error(`We weren't granted permission.`);
    }
}

export async function subscribeClient (registration: any) {
    return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(SERVER_KEY)
    });
}

export async function subscribeServer (subscription: any) {
    let response = await fetch(SAVE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    });

    if (!response.ok) {
        throw new Error('Bad status code from server.');
    }

    let data = await response.json();
    if (!(data && data.success)) {
        throw new Error('Bad response from server.');
    }
}

function urlBase64ToUint8Array (base64String: string): Uint8Array {
    let padding = '='.repeat((4 - base64String.length % 4) % 4);
    let base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
