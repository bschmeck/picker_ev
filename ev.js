function Round(number, people, picked) {
    this.number = number;
    this.people = people;
    this.picked = picked;
}

Round.prototype.risk = function() {
    return this.number + 3;
}

Round.prototype.size = function() {
    return 1.0 * this.people;
}

Round.prototype.isPressing = function() {
    return this.picked;
}

Round.prototype.prLosing = function() {
    return 1 / this.size();
}

Round.prototype.prWinning = function() {
    return 1 - this.prLosing();
}

Round.prototype.currentRoundEv = function() {
    if (this.people == 1)
        return 1;
    else if (this.isPressing())
        return this.prLosing() * this.risk();
    else
        return 0;
}

Round.prototype.nextRoundEv = function() {
    if (this.people == 1) {
        return 0;
    } else if (this.isPressing()) {
        var nextRound = new Round(this.number + 1, this.people, false);
        return this.prWinning() * nextRound.monahanEv();
    } else {
        if (this.prPress() > 0) {
            // This round is a double down press.  That means there are size + 1 names in the picker
            // 1 of them is ours, so pr of being picked is 1 out of (size + 1)
            // 2 of them are the presser, so pr of the game ending is 2 out of (size + 1) & can be ignored
            // The rest are other people, so pr of the game continuing w/o being picked is (size + 1 - 3) out of (size + 1)
            var prPicked = 1 / (this.size() + 1);
            var nextRoundPicked = new Round(this.number + 1, this.people - 1, true);
            var evPicked = prPicked * nextRoundPicked.monahanEv();

            var prNotPicked = (this.size() - 2) / (this.size() + 1);
            var nextRoundNotPicked = new Round(this.number + 1, this.people - 1, false);
            var evNotPicked = prNotPicked * nextRoundNotPicked.monahanEv();

            return this.prPress() * (evPicked + evNotPicked);
        } else {
            // Skip the above calc if we know there won't be a press.
            return 0;
        }
    }
}

Round.prototype.monahanEv = function() {
    return this.currentRoundEv() + this.nextRoundEv();
}

Round.prototype.prPress = function() {
    if (this.risk() > 6)
        return 0;
    return 1;
}

Round.prototype.doubleDownEv = function() {
    return 2 * this.risk() / (this.size() + 1);
}
