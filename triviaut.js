$(document).ready(function () {
    $.get("start-game-form-contents.html").then(html => $("#start-game-form").html(html));      //betölti a start-game-form-contents.html fájl tartalmát a játék paraméter választó formjába (start-game-form)
    //ugyan az mint:
    // $.get("start-game-form-contents.html").then(function(eredmeny) {
    //     $("#start-game-form").html(eredmeny);
    // });

    $("#lets-play-button").on("click", function (e) {
        $(e.target).toggle();           //eltünteti azt az elemet amire kattintottunk -> "let's play" gombot
        $("#start-game-form-section").toggle();     //megjeleníti a "loading..." feliratot (itt lesznek a játékbeállítások)
        $("#game-section").toggle();                //megjeleníti a játék section-t
    });
})