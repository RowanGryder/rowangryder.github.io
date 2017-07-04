// Code by Rowan Guarnagia-Gryder

function navFold(x) {
    x.classList.toggle("change");
    
    var lm = document.getElementById("elem");
    lm.classList.toggle("change");
}

function scrollTarget() {
    var target = document.getElementById("target");
    var source = document.getElementById("source");
    target.scrollTop = source.scrollTop;
    target.scrollLeft = source.scrollLeft;
}
