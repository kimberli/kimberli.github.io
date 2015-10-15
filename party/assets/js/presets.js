// Preset module - includes preset configurations & method for changing the model

/**
 * Preset class - define preset patterns
 */
var Presets = function() {
    var that = Object.create(Presets.prototype);

    that.getPresetList = function() {
        return Object.keys(presetPatterns);
    }

    that.setPreset = function(gameboard, presetName) {
        var pattern = presetPatterns[presetName];
        gameboard.setBoard(repeatPattern(pattern,gameboard.getSize()));
    }

    var repeatPattern = function(pattern, size) {
        var height = pattern.length;
        var width = pattern[0].length;
        var board = Array.apply(null, Array(size)).map(function(row,rowIndex) { 
                return Array.apply(null, Array(size)).map(function(cell,colIndex) { 
                    return pattern[rowIndex % height][colIndex % width];
                });
            });
        return board;
    }

    var presetPatterns = {}; //patterns must be rectangular 2D arrays
    presetPatterns["block"] = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];
    presetPatterns["beehive"] = [[0,0,0,0,0,0],[0,0,1,1,0,0],[0,1,0,0,1,0],[0,0,1,1,0,0],[0,0,0,0,0,0]];
    presetPatterns["loaf"] = [[0,0,0,0,0,0],[0,0,1,1,0,0],[0,1,0,0,1,0],[0,0,1,0,1,0],[0,0,0,1,0,0],[0,0,0,0,0,0]];
    presetPatterns["blinker"] = [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]];
    presetPatterns["toad"] = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,1,1,1,0],[0,1,1,1,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    presetPatterns["pulsar"] = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    presetPatterns["pentadecathlon"] = [[0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,1,0,1,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,1,0,1,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,1,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0]];
    presetPatterns["glider"] = [[0,0,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,1,1,1,0],[0,0,0,0,0]];
    presetPatterns["line"] = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]];

    Object.freeze(that);
    return that;
}