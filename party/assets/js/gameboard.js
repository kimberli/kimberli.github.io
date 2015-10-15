// Gameboard module - defines the gameboard class

/**
 * Gameboard class - model for the gameboard
 *
 * @param {number} size - board size; must be an integer greater than 0
 */
var Gameboard = function(size) {
    var states = Array.apply(null, Array(size)).map(function() { 
            return Array.apply(null, Array(size)).map(function() {return 0;});
        }); //states in the board are 0 for dead cells and 1 for live cells
    var subscribers = [];
    
    var publishChanges = function() {
        subscribers.forEach(function(s) { s(); });
    };

    var that = Object.create(Gameboard.prototype);

    /**
     * Add subscriber to the model
     * 
     * @param {function} subscriber - function to be called when model changes
     */
    that.subscribe = function(subscriber) {
        subscribers.push(subscriber);
    };

    /**
     * Get board size
     * 
     * @return {number} board size
     */
    that.getSize = function() {
        return size;
    }

    /**
     * Get board array
     * 
     * @return {object} 2D array of board rows & columns
     */
    that.getBoard = function() {
        var newBoard = [];
        states.forEach(function(row) {
            newBoard.push(row.slice());
        })
        return newBoard;
    }

    /**
     * Set board array
     * 
     * @param {object} 2D array of board rows & columns
     */
    that.setBoard = function(board) {
        if (board.length === size && board[0].length === size) {
            states = board;
            publishChanges();
        }
    }

    /**
     * Get cell state
     * 
     * @param {number} row - the row of the cell; must be integer
     * @param {number} col - the column of the cell; must be integer
     * @return {number} state of cell, 0 for dead and 1 for live; returns 0 if out of board range
     */
    that.getCell = function(row,col) {
        if (row > -1 && col > -1 && row < size && col < size) {
            return states[row][col];
        }
        return 0;
    }

    /**
     * Set cell state; does nothing if invalid row, col, or state
     * 
     * @param {number} row - the row of the cell; must be integer
     * @param {number} col - the column of the cell; must be integer
     * @param {number} state - the state to set the cell at
     */
    that.setCell = function(row,col,state) {
        if (row > -1 && col > -1 && row < size && col < size) {
            if (typeof(state) === 'number' && (state === 0 || state === 1)) {
                states[row][col] = state;
            }
        }
        publishChanges();
    }

    /**
     * Toggle cell state; does nothing if invalid row/col
     * 
     * @param {number} row - the row of the cell; must be integer
     * @param {number} col - the column of the cell; must be integer
     */
    that.toggleCell = function(row,col) {
        if (row > -1 && col > -1 && row < size && col < size) {
            if (that.getCell(row,col) === 0 ) {
                that.setCell(row,col,1);
            }
            else if (that.getCell(row,col) === 1 ) {
                that.setCell(row,col,0);
            }
        }
    }

    /**
     * Get cell's number of neighbors; returns 0 if invalid row/col
     * 
     * @param {number} row - the row of the cell; must be integer
     * @param {number} col - the column of the cell; must be integer
     * @return {number} number of neighbors (cells outside board are dead)
     */
    that.getNeighborCount = function(row,col) {
        if (row > -1 && col > -1 && row < size && col < size) {
            var count = 0;
            var diff = [-1,0,1];
            diff.forEach(function(dx) {
                diff.forEach(function(dy) {
                    count += that.getCell(row+dx,col+dy);
                })
            })
            count -= that.getCell(row,col);
            return count;
        }
        return 0;
    }

    Object.freeze(that);
    return that;
}