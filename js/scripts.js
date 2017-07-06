// Code by Rowan Guarnagia-Gryder

function navFold(x) {
    x.classList.toggle("change");
    
//    var lm = document.getElementById("elem");
//    lm.classList.toggle("change");
    
    document.getElementById("elem").classList.toggle("change");
}

function indexFold() {
    
}

function indexOpen() {
    document.getElementById("indexBar").style.transform = "translate(0%)";
//    document.getElementById("indexBar").classList.add("open");

    document.getElementById("indexSel").style.display = "none";
}

function indexClose() {
    document.getElementById("indexBar").style.transform = "translate(100%)";
//    document.getElementById("indexBar").classList.remove("");
    document.getElementById("indexSel").style.display = "block";
}

function scrollTarget() {
    var target = document.getElementById("target");
    var source = document.getElementById("source");
    target.scrollTop = source.scrollTop;
    target.scrollLeft = source.scrollLeft;
}
