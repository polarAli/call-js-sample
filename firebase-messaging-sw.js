importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

const firebaseConfig = {}; // Put Your Firebase Config Here

let baseSampleURL = 'http://IP:PORT'; // Your sample running base url

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(event => {

    console.log('[firebase-messaging-sw.js] Received background message ', event);
    var payload = JSON.parse(event.data.payload);

    return self.registration.showNotification('Incoming call', {
        body: 'You have a call from ' + payload.call.caller.fullname,
        icon: payload.call.caller.avatarURL,
        requireInteraction: true,
        data: payload
    });
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    console.log("Notification clicked", event);
    if (clients.openWindow) {
        return clients.openWindow(`${baseSampleURL}#/call/${event.notification.data.callId}/${event.notification.data.accessToken}`);
    }
});