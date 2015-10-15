// Test module - runs tests

/**
 * Test board creation
 */
QUnit.test("create board", function(assert) {
    var gb = Gameboard(5);
    var board = gb.getBoard();
    assert.deepEqual(board.length,5,"Passed!");
    board.forEach(function(row) {
        assert.deepEqual(row.length,5,"Passed!");
    })
});

/**
 * Test getting board size
 */
QUnit.test("get board size", function(assert) {
    var gb = Gameboard(50);
    assert.deepEqual(gb.getSize(),50,"Passed!");
});

/**
 * Test getting state
 */
QUnit.test("get cell state", function(assert) {
    var gb = Gameboard(5);
    assert.deepEqual(gb.getCell(0,1),0,"Passed!");
});

/**
 * Test setting state
 */
QUnit.test("set cell state", function(assert) {
    var gb = Gameboard(5);
    gb.setCell(0,3,1);
    assert.deepEqual(gb.getCell(0,3),1,"Passed!");
    assert.deepEqual(gb.getCell(0,2),0,"Passed!");
});

/**
 * Test getting board
 */
QUnit.test("get board", function(assert) {
    var gb = Gameboard(5);
    gb.setCell(0,3,1);
    assert.deepEqual(gb.getBoard()[0][3],1,"Passed!");
    assert.deepEqual(gb.getBoard()[0][2],0,"Passed!");
});

/**
 * Assert getBoard returns defensively copied array
 */
QUnit.test("get board copy", function(assert) {
    var gb = Gameboard(5);
    gb.setCell(0,3,1);
    var board = gb.getBoard();
    board[0][2] = 1;
    assert.deepEqual(gb.getCell(0,3),1,"Passed!");
    assert.deepEqual(gb.getCell(0,2),0,"Passed!");
});

/**
 * Test toggle cell
 */
QUnit.test("toggle cell", function(assert) {
    var gb = Gameboard(5);
    gb.toggleCell(4,2);
    assert.deepEqual(gb.getCell(4,2),1,"Passed!");
    gb.toggleCell(4,2);
    assert.deepEqual(gb.getCell(4,2),0,"Passed!");
    gb.toggleCell(4,2);
    assert.deepEqual(gb.getCell(4,2),1,"Passed!");
});

/**
 * Test getting neighbor count
 */
QUnit.test("get neighbor count", function(assert) {
    var gb = Gameboard(5);
    gb.toggleCell(2,2);
    gb.toggleCell(2,3);
    gb.toggleCell(2,4);
    gb.toggleCell(3,2);
    gb.toggleCell(3,3);
    assert.deepEqual(gb.getNeighborCount(2,2),3,"Passed!");
});

/**
 * Test getting neighbor count on edge cell
 */
QUnit.test("get neighbor count edge", function(assert) {
    var gb = Gameboard(5);
    gb.toggleCell(4,2);
    gb.toggleCell(4,3);
    gb.toggleCell(4,4);
    gb.toggleCell(3,2);
    gb.toggleCell(3,3);
    assert.deepEqual(gb.getNeighborCount(4,3),4,"Passed!");
});

/**
 * Test getting neighbor count corner cell
 */
QUnit.test("get neighbor count", function(assert) {
    var gb = Gameboard(5);
    gb.toggleCell(0,1);
    gb.toggleCell(1,0);
    gb.toggleCell(1,1);
    assert.deepEqual(gb.getNeighborCount(0,0),3,"Passed!");
});
