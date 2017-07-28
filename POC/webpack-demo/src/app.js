// src/app.js
const root = document.querySelector('#root')
root.innerHTML = `<p>Hello webpack.</p>`

const bar = document.getElementById("progressBarContent");
function createProgressBar(bar) {
  var myWidth = 0, handle;
  function frame() {
    if(myWidth >= 100) {
      clearInterval(handle);
    }
    else {
      myWidth ++;
      bar.style.width = myWidth+'%';
    }
  }
  handle = setInterval(frame, 20);
}
createProgressBar(bar);


