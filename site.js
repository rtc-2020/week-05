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
