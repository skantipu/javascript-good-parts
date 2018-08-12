/**
 * Timer module to keep track of time countdown, and when it is up, you end the game
 */
const Timer = (function () {
  let futureTimerDate;
  let handle;
  const timerDiv = document.getElementById('timer');

  function stopTimer() {
    clearInterval(handle);
  }

  function setTime(totalTime) {
    futureTimerDate = new Date().getTime() + totalTime * 60000;
    timerDiv.innerText = `${totalTime} : 00`;
    handle = setInterval(function () {
      const timeDiff = futureTimerDate - new Date().getTime();
      let minutes = Math.floor(timeDiff / 60000);
      let seconds = Math.round((timeDiff / 1000) % 60);
      if (minutes + seconds <= 0) {
        clearInterval(handle);
        Minesweeper.errorMsgHandler('Sorry, time out, game over. Better luck next time!');
        minutes = 0;
        seconds = 0;
      }
      timerDiv.innerText = `${minutes} : ${seconds}`;
    }, 1000);
  }

  return {
    init: setTime,
    stopTimer
  };
})();
