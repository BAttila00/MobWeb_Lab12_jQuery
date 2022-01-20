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
    function getNextQuestion() {
        currentQuestion++;
        const question = remainingQuestions.pop();
        if (question === undefined) {
            // TODO: nincs több kérdés!
            return;
        }

        //A válaszok összeállítása egy tömbbe
        correctAnswerIndex = Math.floor(Math.random() * 4);
        const answers = question.incorrect_answers.slice();
        answers.splice(correctAnswerIndex, 0, question.correct_answer);
        $('.answer').prop( "disabled", false );
        $(".answer .correct, .answer .incorrect, #next-question").hide();
        console.log(answers);

        //convert answers from base64
        var decodedAnswers = [];
        for (const element of answers) {
            decodedAnswers.push(atob(element)); 
        }
        console.log(decodedAnswers);

        //convert question frome base64
        var decodedQuestion = atob(question.question);
        console.log(decodedQuestion);

        $("#current-question-number").text(currentQuestion);
        $("#question-category").text(atob(question.category));
        $("#question-difficulty").text(atob(question.difficulty));
        $("#question-text").text(decodedQuestion);

        //válaszok szövegének beállítása
        $(".answer").hide();
        for (let index = 0; index < decodedAnswers.length; ++index) {
            const element = decodedAnswers[index];
            $(`.answer[data-answer-index='${index}'] .answer-text`).text(element);
            $(`.answer[data-answer-index='${index}']`).show();
        }

        //Ez nem jó, mert itt a "this" nem a kattintott elemre mutat
        // $(".answer").on("click", event => {
        //     console.log($(this).attr('data-answer-index'));
        // });


        $(".answer").on("click", event => {        //Arrof function esetén nincs saját this ezért a $(this).attr(...) nem működik

            //var clickedAnswerIndex = event2.target.getAttribute('data-answer-index');     //ez néha "null" értéket adott vissza. Rájöttem h akkor ha ha nem a gombra kattintottam,
            //hanem a benne lévő szövegre, azaz a gomb gyerekére. A lenti link megoldotta a problémát. Ki kellett cserélni "target"-et "currentTarget"-re.
            //https://forums.meteor.com/t/solved-getting-click-event-data-is-null-when-clicking-child-element/50660
            var clickedAnswerIndex = event.currentTarget.getAttribute('data-answer-index');
            console.log(clickedAnswerIndex);
            if(clickedAnswerIndex == correctAnswerIndex){
                $(event.currentTarget.getElementsByClassName('correct')).show();
            }
            else {
                $(event.currentTarget.getElementsByClassName('incorrect')).show();
                $(`.answer[data-answer-index='${correctAnswerIndex}'] .correct`).show();
            }
            $('.answer').prop( "disabled", true );
            $("#next-question").show();
        });

        //így is elérhetjük a kattintott elem egy attribútumát
        // $('.answer').click(function() {
        //     console.log($(this).attr('data-answer-index'));
        // });

    }

    //...
    $.get("start-game-form-contents.html").then(html => $("#start-game-form").html(html)    //betölti a start-game-form-contents.html fájl tartalmát a játék paraméter választó formjába (start-game-form)
        .on("submit", event => { // közvetlenül a HTML beszúrása után lácolhatjuk a 'submit' eseményre történő feliratkozást   //itt iratkozunk fel a "Go!" button lenyomásra
            event.preventDefault(); // a böngésző alapértelmezett működését megállítjuk, amivel újratöltené az oldalt
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
            $("#start-game-form-section").hide();
            $("#next-question").on("click", () => {  
                getNextQuestion();
            });
        }));
})