//Scale name on scroll
function scrollScale() {
    var nameTag = document.getElementById('nameTag');
    var header = document.getElementById('nameHeader');

//    nameTag.innerHTML = document.documentElement.scrollTop + "px from top";

    if (document.documentElement.scrollTop > 0) {
        nameTag.style.fontSize = "4vw";
        header.style.top = "-1vw";
    } else {
        nameTag.style.fontSize = "10vw";
        header.style.top = "-2.5vw";
    }
}

function navFold(elem) {
    elem.classList.toggle("change");
    document.getElementById('elem').classList.toggle("change");
}