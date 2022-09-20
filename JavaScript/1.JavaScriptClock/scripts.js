
let promptName = prompt("Lutfen Adinizi Giriniz: ");

let myNameEl = document.getElementById("myName");
let myClockEl = document.getElementById("myClock");


myNameEl.innerHTML = promptName;

// Current Hour and Day Function
function time() {
    const weekday = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Friday","Cumartesi"];
    var current = new Date();
    var s = current.getSeconds();
    var m = current.getMinutes();
    var h = current.getHours();

    var day = weekday[current.getDay()];

    myClockEl.textContent = 
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + " " + day;
}

setInterval(time, 1000);
