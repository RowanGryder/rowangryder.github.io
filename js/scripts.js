function navFold(x) {
    x.classList.toggle("change");
    
//    var lm = document.getElementsByClassName("mainLinks");
//    for (var i = 0; i > lm.length; i++){
//        var r = document.getElementsByClassName("mainLinks")[i];
//        r.classList.toggle("change");
//    }
//    lm.classList.toggle("change")
    
    var lm = document.getElementById("elem");
    lm.classList.toggle("change");
}

//function responsiveNav() {
//    var x = document.getElementById("navBar");
//    if(x.className === "navBar"){
//        x.className += " responsive";
//    } else {
//        x.className = "navBar";
//    }
//}