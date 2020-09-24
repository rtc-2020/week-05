if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log(`Successfully registered service worker to ${registration.scope}`);
      // Do more things with the registration
      // console.log(typeof registration.pushManager); -> `object`
      // var options = {} -> subscription options
      // when the Subscribe to Notifications button is clicked, call to
      if ('Notification' in window) {
        console.log('Sweet. We have notifications in this browser.');
        var notify_button = document.createElement('button');
        notify_button.innerText = 'Send Me Notifications';
        notify_button.id = 'notify';
        notify_button.addEventListener('click', function(e) {
          console.log('The notifications button has been clicked, and we are ready for action');
          Notification.requestPermission()
          .then(function(permission) {
            console.log("Permission: ", permission);
            if (permission == 'granted') {
              var options = {};
              registration.pushManager.subscribe(options);
              .then(function(subscription) {
                // diagnostic of the subscription object returned by subscribe():
                console.log(JSON.stringify(subscription));
                // Logic here to then save the subscription by calling fetch('/subscription', ...);
              })
              .catch(function(error) {
                console.error('Error: ', error);
              });
            }
          })
          .catch(function(error) {
            console.error("Error: ", error)
          });
        });
      document.querySelector('body').append(notify_button);
    })
    .catch(function(error) {
      console.error('Could not register service worker', error)
    });
}

/*
var socket = io.connect('/');

socket.on('message', function(data) {
  console.log('Message received: ' + data);
});
*/
