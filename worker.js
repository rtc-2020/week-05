console.log('Hey! I am a Web Worker! I was just born.');

onmessage = function(data) {
  if (data.data == 'Can you hear me, Worker?') {
    postMessage('Yes, I can hear you!');
  }
};
