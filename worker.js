console.log('Hey! I am a Web Worker! I was just born.');

onmessage = function(data) {
  if (data.data == 'Can you hear me, Worker?') {
    postMessage('Yes, I can hear you!');
  }
  if (data.data == 'Do work') {
    (async function() {
      var result = await doHardWork();
      postMessage(`I have finished my work! ${result}`);
    })();
  }
};

async function doHardWork() {
  var i;
  for (i=0; i < 100000000; i++) {
    i = i * 2000;
  }
  return i;
}
