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
