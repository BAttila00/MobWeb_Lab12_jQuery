$(document).ready(function () {
    $("#lets-play-button").on("click", function (e) {
        $(e.target).toggle();           //eltünteti azt az elemet amire kattintottunk -> "let's play" gombot
        $("#start-game-form-section").toggle();     //megjeleníti a "loading..." feliratot
        $("#game-section").toggle();                //megjeleníti a játék section-t
    });
})