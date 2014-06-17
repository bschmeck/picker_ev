var calc = function() {
    var number = parseInt(document.getElementById("number").value);
    if (isNaN(number)) {
        alert("Illegal value for Round Number");
        return;
    }
    var people = parseInt(document.getElementById("people").value);
    if (isNaN(people)) {
        alert("Illegal value for Number of People");
        return;
    }
    var picked = true;

    var round = new Round(number, people, picked);
    console.log("Double Down: " + round.doubleDownEv());
    console.log("Monahan    : " + round.monahanEv());
}
