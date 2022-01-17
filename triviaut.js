$(document).ready(function () {
    $.get("start-game-form-contents.html").then(html => $("#start-game-form").html(html));

    $("#lets-play-button").on("click", function (e) {
        $(e.target).toggle();           //eltünteti azt az elemet amire kattintottunk -> "let's play" gombot
        $("#start-game-form-section").toggle();     //megjeleníti a "loading..." feliratot (itt lesznek a játékbeállítások)
        $("#game-section").toggle();                //megjeleníti a játék section-t
    });
})