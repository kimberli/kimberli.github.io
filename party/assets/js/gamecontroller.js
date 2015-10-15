// Game controller module - changes the gameboard state

/** Advance board to next state
 *
 * @param {Gameboard} gameboard - the gameboard object
 */
var advanceState = function(gameboard) {
    var board = gameboard.getBoard();
    board.forEach(function(row,rowIndex) { 
        row.forEach(function(cell,colIndex) {
            if (gameboard.getCell(rowIndex,colIndex) === 1 && 
                    (gameboard.getNeighborCount(rowIndex,colIndex) < 2 || 
                    gameboard.getNeighborCount(rowIndex,colIndex) > 3)) {
                board[rowIndex][colIndex] = 0;
            }
            else if (gameboard.getCell(rowIndex,colIndex) === 0 && 
                    gameboard.getNeighborCount(rowIndex,colIndex) === 3) {
                board[rowIndex][colIndex] = 1;
            }
        });
    });
    gameboard.setBoard(board);
}

/** Set board to random state
 *
 * @param {Gameboard} gameboard - the gameboard object
 */
var setRandom = function(gameboard) {
    var board = gameboard.getBoard();
    board.forEach(function(row,rowIndex) {
        row.forEach(function(cell,colIndex) {
            board[rowIndex][colIndex] = Math.round(Math.random());
        })
    });
    gameboard.setBoard(board);
}

/** Reset board to blank state
 *
 * @param {Gameboard} gameboard - the gameboard object
 */
var resetBoard = function(gameboard) {
    var size = gameboard.getSize();
    var board = Array.apply(null, Array(size)).map(function() { 
            return Array.apply(null, Array(size)).map(function() {return 0;});
        });
    gameboard.setBoard(board);
}