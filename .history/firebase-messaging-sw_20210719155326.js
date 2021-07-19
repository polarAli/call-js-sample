importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAF77zjpsk1TnUgCEK1twSmRk_NTkGeNDE",
    authDomain: "test-2106d.firebaseapp.com",
    projectId: "test-2106d",
    storageBucket: "test-2106d.appspot.com",
    messagingSenderId: "1033998495695",
    appId: "1:1033998495695:web:7b47a914466032e384acba"
  };

let baseSampleURL = 'https://call-test-kavenegar.herokuapp.com'; // Your sample running base url

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
