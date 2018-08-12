const Minesweeper = (function () {
  let sizeX, sizeY, numberOfMines;
  let mineMap = {}; // sample: {21: 1, 3: 1, 6: 1} mines are present in the positions 21, 6, 3
  let gameOver = false;
  const errorDiv = document.getElementById('errorMessage');
  const colorMap = {
    1: 'RED',
    2: 'PURPLE',
    3: 'SEAGREEN',
    4: 'TOMATO',
    5: 'INDIGO',
    6: 'DARKRED',
    7: 'HOTPINK',
    8: 'LIGHTSALMON'
  };

  function init(x, y, n) {
    sizeX = x;
    sizeY = y;
    numberOfMines = n;
    clearData();
    createDOM();
    setMines();
    handleClick();
    // revealMines(); //for testing sake
  }

  /**
   * Method to set 'mineMap' with mines data
   */
  function setMines() {
    for (let i = 0; i < numberOfMines; i++) {
      mineMap[getRandom()] = 1;
    }
  }

  /**
   * Method to get a unique random number that is not already chosen
   */
  function getRandom() {
    const rand = Math.ceil(Math.random() * (sizeX * sizeY));
    if (mineMap.hasOwnProperty(rand)) {
      return getRandom();
    }
    return rand;
  }

  /**
   * Method to show mines in the game when user wins or loses a game
   */
  function revealMines() {
    for (let mine in mineMap) {
      const div = document.querySelector(`[data-position='${mine}']`);
      div.classList.add('mine-clicked');
      div.innerHTML = '<img class="bomb" src="img/bomb.png"></img>';
    }
  }

  /**
   * Method to handle showing/hiding of message (error, success etc) to the user
   * @param msg - message to display
   * @param state - show/hide
   */
  function handleMessage(msg, state = 'open') {
    errorDiv.innerText = msg;
    state === 'hide' ? errorDiv.classList.add('hide') : errorDiv.classList.remove('hide');
    gameOver = true;
    Timer.stopTimer();
  }

  /**
   * Method to reset the mineMap and other data every time user clicks 'generate' button i.e., when user plays a new game.
   */
  function clearData() {
    const container = document.getElementById('mineSweeper');
    container.innerHTML = '';
    mineMap = {};
    handleMessage('', 'hide');
    gameOver = false;
  }

  /**
   * Method to create minesweeper game squares on the UI dynamically based on number of rows (sizeX) and number
   * of columns (sizeY) as input by user
   */
  function createDOM() {
    const container = document.getElementById('mineSweeper');
    for (let i = 0; i < sizeX; i++) {
      const div = document.createElement('div');
      div.classList.add('row');
      container.appendChild(div);
    }
    const rows = document.getElementsByClassName('row');
    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= sizeY; j++) {
        const div = document.createElement('div');
        div.setAttribute('data-position', (sizeY * i + j).toString());
        rows[i].appendChild(div);
      }
    }
  }

  /**
   * Method to handle flow when user clicks on a square (that is not already clicked). It handles 3 conditions
   * as mentioned in the problem statement
   */
  function clickSquare() {
    if (!gameOver && !this.classList.contains('opened')) {
      this.classList.add('opened');
      const clickedNodePosition = this.dataset.position;

      if (mineMap.hasOwnProperty(clickedNodePosition)) {
        // square contains mine
        handleMessage('Sorry that you lost! Game over, better luck next time!');
        revealMines();
      } else {
        const neighborPositions = getAdjacents(clickedNodePosition);
        let adjacentMines = neighborPositions.reduce((acc, pos) => acc + (mineMap[pos] || 0), 0);
        if (adjacentMines > 0) {
          this.innerText = adjacentMines;
          this.style.color = colorMap[adjacentMines];
        } else {
          // 3rd condition, no mine in it nor any adjacent mines
          this.classList.add('empty');
          for (let position of neighborPositions) {
            const div = document.querySelector(`[data-position='${position}']`);
            clickSquare.call(div);
          }
        }
      }
      checkUserWin();
    }
  }

  /**
   * Method to check if user won
   */
  function checkUserWin() {
    const openedDivs = document.querySelectorAll('.row div.opened');
    if (!gameOver && openedDivs.length + Object.keys(mineMap).length === (sizeX * sizeY)) {
      handleMessage("Congrats!!! You won!! Game over, we'd love to see you again!!");
      revealMines();
    }
  }

  function handleClick() {
    const squares = document.querySelectorAll('.row div');
    for (let square of squares) {
      square.addEventListener('click', function (event) {
        clickSquare.call(this);
      });
    }
  }

  /**
   * Method to get row index of the position in the matrix
   * @param position - takes value between 1 and sizeX * sizeY
   * @returns {number}
   */
  function getX(position) {
    return Math.floor((position - 1) / sizeY);
  }

  /**
   * Method to get column index of the position in the matrix
   * @param position - takes value between 1 and sizeX * sizeY
   * @returns {number}
   */
  function getY(position) {
    return (position - 1) % sizeY;
  }

  /**
   * Method to get position value from row and column indices
   * @param x - between 0 and sizeX-1
   * @param y - between 0 and sizeY-1
   * @returns {number} - position value between 1 and sizeX * sizeY
   */
  function getPosition(x, y) {
    return (x) * sizeY + y + 1;
  }

  /**
   * Method to clamp a value to a range, so it is not outside the range
   * @param num - number to be clamped
   * @param max - max in the range, min is 0
   * @returns {number} - clamped number
   */
  function clamp(num, max) {
    const maxX = max - 1;
    return Math.min(Math.max(0, num), maxX);
  }

  /**
   * Method to get neighbor node indexes
   * @param pos - position of node (value between 1 and sizeX * sizeY)
   * @returns {Array} - adjacent nodes (max can be 8)
   */
  function getAdjacents(pos) {
    const neighbours = [];
    const x = getX(pos);
    const y = getY(pos);
    for (let i = clamp(x - 1, sizeX); i <= clamp(x + 1, sizeX); i++) {
      for (let j = clamp(y - 1, sizeY); j <= clamp(y + 1, sizeY); j++) {
        if (i === x && j === y) {
          continue;
        }
        neighbours.push(getPosition(i, j));
      }
    }
    return neighbours;
  }

  return {
    init,
    errorMsgHandler: handleMessage
  };

})();
