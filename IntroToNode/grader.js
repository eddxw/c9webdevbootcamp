function average(scores) {
    var r = 0;
    for (var i=0; i<scores.length; i++){
        r += scores[i];
    }
    return Math.round(r/scores.length);
}

function average2(scores) {
    var sum = scores.reduce((x,y) => x+y)
    return Math.round(sum/scores.length)
}

var scores = [90, 98, 89, 100, 100, 86, 94]
var a1 = average(scores)

var scores2 = [40, 65, 77, 82,80, 54, 73, 63, 95, 49]
var a2 = average2(scores2)

console.log(a1, a2)