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

//var blazy = new Blazy({
//    breakpoints: [{
//        width: 30vw,
//        src: 'data-src'
//    }],
//    success: function(element){
//        updateCounter();
//        setTimeout(function(){
//            var parent = element.parentNode;
//            parent.className = parent.className.replace(/\bloading\b/,'');
//        }, 200);
//    }
//});