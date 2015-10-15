// Main module - sets up gameboard and attaches handlers

$(document).ready(function() {
    var container = $("#game-container");
    var select = $("#game-select");
    var gameboard = Gameboard(50);
    var presets = Presets();
    var interval;

    Gameboard_install(gameboard,presets,container,select);

    select.change(function(event) {
        presets.setPreset(gameboard,event.target.value);
    });

    $(".cell").click(function(event) {
        var row = $(event.target).attr("row");
        var col = $(event.target).attr("col")
        gameboard.toggleCell(row,col);
    });

    $("#game-start").click(function() {
        $("#game-start").removeClass("btn-primary");
        $("#game-start").addClass("btn-info");
        $("#game-stop").removeClass("btn-info");
        $("#game-stop").addClass("btn-primary");
        $("#game-start").prop('disabled', true);
        $("#game-stop").prop('disabled', false);
        interval = setInterval(function() {
            advanceState(gameboard);
        },250);
    });

    $("#game-stop").click(function() {
        $("#game-start").removeClass("btn-info");
        $("#game-start").addClass("btn-primary");
        $("#game-stop").removeClass("btn-primary");
        $("#game-stop").addClass("btn-info");
        $("#game-start").prop('disabled', false);
        $("#game-stop").prop('disabled', true);
        clearInterval(interval);
    });

    $("#game-reset").click(function() {
        resetBoard(gameboard);
    });

    $("#game-random").click(function() {
        setRandom(gameboard);
    });
});