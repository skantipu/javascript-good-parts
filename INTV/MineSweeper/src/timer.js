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
      let timeDiff = futureTimerDate - new Date().getTime();
      let minutes = Math.floor(timeDiff / 60000);
      let seconds = Math.round((timeDiff / 1000) % 60);
      timerDiv.innerText = `${minutes} : ${seconds}`;
      if (minutes + seconds <= 0) {
        resetTimer();
        clearInterval(handle);
        Minesweeper.errorMsgHandler('Sorry, time out, game over. Better luck next time!');
      }
    }, 1000);
  }

  return {
    init: setTime,
    stopTimer
  };
})();
