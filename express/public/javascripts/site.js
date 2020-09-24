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
                  // fetch the public VAPID key
                  fetch('/subscription/public-key/')
                  .then(function(response) {
                    console.log('Raw fetch response:', response);
                    return response.json();
                  })
                  .then(function(data) {
                    console.log('Fetch response data: ', data);
                    var options = {
                      userVisibleOnly: true,
                      applicationServerKey:  urlBase64ToUint8Array(data.vapid_public_key)
                    };
                    registration.pushManager.subscribe(options)
                      .then(function(subscription) {
                        // diagnostic of the subscription object returned by subscribe():
                        console.log(JSON.stringify(subscription));
                        // Logic here to then save the subscription by calling fetch('/subscription', ...);
                        fetch('/subscription/',
                          { method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(subscription) })
                          .then(function(response) { return response.json(); })
                          .then(function(response) { console.log(response); })
                          .catch(function(error) {
                            console.error('Error: ', error);
                          });
                        })
                        .catch(function(error) {
                          console.error('Subscription error: ', error);
                        }); // end subscription
                  })
                  .catch(function(error) {
                    console.error('Fetch error: ', error);
                  }); //
              } // if permission granted
            })
            .catch(function(error) {
              console.error('Permission error: ', error);
            }); // end permission
        }); // notify_button click event
        document.querySelector('body').append(notify_button);

      } // if notification
    })
    .catch(function(error) {
      console.error('Could not register service worker', error)
    });
} // if service worker...

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/*
var socket = io.connect('/');

socket.on('message', function(data) {
  console.log('Message received: ' + data);
});
*/
