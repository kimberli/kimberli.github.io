// Display module - updates the view based on changes in model using subscriber pattern

/** Installs the gameboard on the page and subscribe the view to model changes
 * 
 * @param {Gameboard} gameboard - the gameboard model
 * @param {object} container - the container in the page in which the game should be inserted
 */
var Gameboard_install = function(gameboard, presets, container, select) {
    var gameElts = [];

    /** Create the gameboard in the page and track its elements
     */
    var createGameboard = function() {
        var board = gameboard.getBoard();
        board.forEach(function(row,rowIndex) {
            var gameRow = $("<div>", {"class": "row"});
            container.append(gameRow);
            var gameEltsRow = gameElts[gameElts.push([])-1];
            row.forEach(function(cell,colIndex) {
                var cellElt = $("<div>", {"class": "cell", "row" : rowIndex, "col": colIndex});
                gameRow.append(cellElt);
                gameEltsRow.push(cellElt);
            });
        });
    }

    /** Update the gameboard view to match the model
     */
    var updateGameboard = function() {
        gameElts.forEach(function(row,rowIndex) {
            row.forEach(function(cell,colIndex) {
                var state = gameboard.getCell(rowIndex,colIndex)
                if (state === 0 && gameElts[rowIndex][colIndex].hasClass("on")) {
                    gameElts[rowIndex][colIndex].removeClass("on");
                }
                else if (state === 1 && !gameElts[rowIndex][colIndex].hasClass("on")) {
                    gameElts[rowIndex][colIndex].addClass("on");
                }
            });
        });
    }

    var populateSelect = function() {
        var presetList = presets.getPresetList();
        presetList.forEach(function(preset) {
            var option = $("<option>", {"class" : "option", "value": preset}).text(preset);
            select.append(option);
        })
    }

    createGameboard();
    populateSelect();

    gameboard.subscribe(function() {
        updateGameboard();
    });
}