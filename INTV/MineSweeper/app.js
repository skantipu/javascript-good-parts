document.getElementById('generateBtn').addEventListener('click', function (event) {
  const rowVal = Number(document.getElementById('rowCount').value);
  const colVal = Number(document.getElementById('colCount').value);
  const mines = Number(document.getElementById('mineCount').value);
  const errorMsgElm = document.getElementById('errorMessage');
  if (!rowVal || !colVal || !mines) {
    Minesweeper.errorMsgHandler('Please enter all the three input values.');
  } else if (mines > (rowVal * colVal)) {
    Minesweeper.errorMsgHandler('Number of mines cannot exceed total number of available slots.');
  } else {
    Minesweeper.init(rowVal, colVal, mines);
    Timer.init(1);
  }
});