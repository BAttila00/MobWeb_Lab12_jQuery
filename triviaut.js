$(document).ready(function () {
    //$.get("start-game-form-contents.html").then(html => $("#start-game-form").html(html));      //betölti a start-game-form-contents.html fájl tartalmát a játék paraméter választó formjába (start-game-form)
    //ugyan az mint:
    // $.get("start-game-form-contents.html").then(function(eredmeny) {
    //     $("#start-game-form").html(eredmeny);
    // });

    $("#lets-play-button").on("click", function (e) {
        $(e.target).toggle();           //eltünteti azt az elemet amire kattintottunk -> "let's play" gombot
        $("#start-game-form-section").toggle();     //megjeleníti a "loading..." feliratot (itt lesznek a játékbeállítások)
        $("#game-section").toggle();                //megjeleníti a játék section-t
    });


    // a globális névtérben deklaráljuk az alábbi változókat és függvényt:
    let remainingQuestions, totalQuestions, currentQuestion, correctAnswerIndex;
    function getNextQuestion() { }

    //...
    $.get("start-game-form-contents.html").then(html => $("#start-game-form").html(html)    //betölti a start-game-form-contents.html fájl tartalmát a játék paraméter választó formjába (start-game-form)
        .on("submit", e => { // közvetlenül a HTML beszúrása után lácolhatjuk a 'submit' eseményre történő feliratkozást
            e.preventDefault(); // a böngésző alapértelmezett működését megállítjuk, amivel újratöltené az oldalt
            $("#start-game-form button[type='submit']").attr("disabled", true); // a Go! gombot letiltjuk, hogy ne lehessen újra API kérést indítani, amíg meg nem érkezett a válasz
            var queryString = "";
            queryString = "https://opentdb.com/api.php?type=multiple&encode=base64&amount=" + $("[name='trivia_amount']").val() +
            "&category=" + $("[name='trivia_category'] :selected").val() + 
            "&difficulty=" + $("[name='trivia_difficulty'] :selected").val();
            console.log("queryString: " + queryString);
            $.get(queryString).then(data => {
                remainingQuestions = data.results;
                console.log(remainingQuestions);
                currentQuestion = 0;
                totalQuestions = remainingQuestions.length;
                $("#total-questions").text(totalQuestions);
                $("#start-game-form button[type='submit']").removeAttr("disabled");
                getNextQuestion();
            });
        }));
})