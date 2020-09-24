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
/*
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
*/

if ('Notification' in window) {
  console.log('This browser supports notifications!');
  var notify_me_button = document.createElement('button');
  notify_me_button.id = "notify-me";
  notify_me_button.innerText = 'Send me Notifications';
  notify_me_button.addEventListener('click', function(event) {
    Notification.requestPermission()
      .then(function(permission) {
        console.log('Permission: ', permission)
      })
      .catch(function(error) {
        console.error('Permission error:', error);
      });
  });

  document.querySelector('body').append(notify_me_button);
}
