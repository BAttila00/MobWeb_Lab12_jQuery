$.get("https://opentdb.com/api.php?amount=10").then(function (q) {
    console.log(q);
    $("body").text(JSON.stringify(q, '\n'));
});