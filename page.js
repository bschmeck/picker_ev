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
    showResults(round);
}

var showResults = function(round) {
    document.getElementById("double_down_ev").innerText = round.doubleDownEv().toFixed(4) + " days";
    document.getElementById("monahan_ev").innerText = round.monahanEv().toFixed(4) + " days";
}
