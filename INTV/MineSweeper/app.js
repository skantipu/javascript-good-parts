document.getElementById('generateBtn').addEventListener('click', function (event) {
  const rowVal = Number(document.getElementById('rowCount').value);
  const colVal = Number(document.getElementById('colCount').value);
  const mines = Number(document.getElementById('mineCount').value);
  const errorMsgElm = document.getElementById('errorMessage');
  if (!rowVal || !colVal || !mines) {
    Minesweeper.errorMsgHandler('Please enter all the three input values.');
  } else if (rowVal > 50 || colVal > 50) {
    //to avoid max call stack issues
    Minesweeper.errorMsgHandler('Please enter a value less than or equal to 50.');
  } else if (mines > (rowVal * colVal)) {
    Minesweeper.errorMsgHandler('Number of mines cannot exceed total number of available slots.');
  } else {
    Minesweeper.init(rowVal, colVal, mines);
    Timer.init(5);
  }
});

/*
TODO
More unit testing
internationalization of messages
MVC framework use - think it's an overkill for this requirement, did not use on purpose
better UX - more fun and cool, more animations
variable timer
current clicked node indication on the UI
module bundling (webpack) and task running
 */