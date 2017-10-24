self.addEventListener('push', async (event) => {
    if (event.data) {
        let body = JSON.parse(event.data.text());

        messageClients(body);

        let { data, type, url } = body;

        var options = {
            body: data && data.message,
            vibrate: [100, 50, 100],
            data
        };
        event.waitUntil(self.registration.showNotification(`💡 lightbuild: ${type}`, options));
    }
});

self.addEventListener('notificationclick', event => {
    var notification = event.notification;
    var url = notification.data.url;

    if (url) {
        self.clients.openWindow(url);
        notification.close();
    } else {
        notification.close();
    }
});

async function messageClients (message) {
    let clients = await getAllClients();
    clients.forEach(client => {
        client.postMessage(JSON.stringify(message));
    });
}

function getAllClients () {
    return self.clients.matchAll({ includeUncontrolled: true });
}
