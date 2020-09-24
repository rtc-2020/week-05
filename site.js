if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log(`Successfully registered service worker to ${registration.scope}`);
    })
    .catch(function(error) {
      console.error('Could not register service worker', error)
    });
}

var clock = document.querySelector('#clock');

setInterval(function(){
  clock.innerText = clockTime();
}, 200);

function clockTime() {
  var now = new Date();
  var time = {};
  time.hours = zeroPad(now.getHours());
  time.minutes = zeroPad(now.getMinutes());
  time.seconds = zeroPad(now.getSeconds());
  return `${time.hours}:${time.minutes}:${time.seconds}`;
}

function zeroPad(val,length) {
  if (length === undefined) {
    length = 2;
  }
  val = val.toString();
  while (val.length < length) {
    val = "0" + val;
  }
  return val;
}

// Call up a Web Worker
if ('Worker' in window) {
  console.log('Spinning up and posting a message to a Web Worker');
  var my_worker = new Worker('worker.js');
  my_worker.postMessage('Can you hear me, Worker?');
  my_worker.onmessage = function(data) {
    console.log('The Web Worker says: ', data.data)
    console.log(data);
  }

  var button = document.querySelector('#work');
  button.addEventListener('click', function(e) {
    my_worker.postMessage('Do work');
  });

}


// Web notifications

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
      })
      .catch(function(error) {
        console.error("Error: ", error)
      });
  });
  document.querySelector('body').append(notify_button);
  if (Notification.permission == 'granted') {
    var test_notify_button = document.createElement('button');
    test_notify_button.innerText = 'Send A Test Notification';
    test_notify_button.id = 'test-notify';
    test_notify_button.addEventListener('click', function(e) {
      var notification_options = {
        body: "And here are some additional details.",

      }
      var test_notification = new Notification('Hi there! This is a local notification.');
      // Listen for clicks on the notification itself; close it, and post an annoying alert
      // Note this event does not fire if someone clicks "Close" on the notification, which
      // is a good thing. Same behavior in the popup as well as the notification center inspector
      // in MacOS.
      test_notification.addEventListener('click', function(event) {
        test_notification.close();
        alert('The notification was clicked!');
      })
    });
    document.querySelector('body').append(test_notify_button);
  }
}
