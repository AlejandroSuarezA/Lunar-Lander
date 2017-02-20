var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var fuel = 100;
var juegoActivo = true;

//al cargar por completo la página...
window.onload = function() {
    //definición de eventos
    //mostrar menú móvil
    //  	document.getElementById("showm").onclick = function () {
    //document.getElementsByClassName("c")[0].style.display = "block";
    //stop();
    //}
    //ocultar menú móvil
    //document.getElementById("hidem").onclick = function () {
    //	document.getElementsByClassName("c")[0].style.display = "none";
    //	start();
    //}
    //encender/apagar el motor al hacer click en la pantalla
    document.onclick = function() {
        if (a == g) {
            motorOn();
        } else {
            motorOff();
        }
    }
    //encender/apagar al apretar/soltar una tecla
    document.onkeydown = motorOn;
    document.onkeyup = motorOff;

    //Empezar a mover nave
    start();
}

//Definición de funciones
function start() {
    timer = setInterval(function() {
        moverNave();
    }, dt * 1000);
}

function stop() {
    clearInterval(timer);
}

function moverNave() {
    v += a * dt;
    document.getElementById("speed").innerHTML = v;
    y += v * dt;
    document.getElementById("altitude").innerHTML = y;

    //mover hasta que top sea un 70% de la pantalla
    if (y < 70) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        juegoActivo = false;
        stop();

        if (v > 5) {
            document.getElementById("cohete").src = "../img/explosion.gif"
        }
    }

}

function motorOn() {
    if (juegoActivo == true) {
        a = -g;
        if (timerFuel == null) {
            document.getElementById("cohete").src = "../img/nave-fuego.png"
            timerFuel = setInterval(function() {
                actualizarFuel();
            }, 10);
        }
        if (fuel < 0) {
            motorOff();
        }
    }
}

function motorOff() {
    if (juegoActivo == true) {
        a = g;
        clearInterval(timerFuel);
        timerFuel = null;
        document.getElementById("cohete").src = "../img/nave.png"
    }
}

function actualizarFuel() {
    if (juegoActivo == true)
        fuel -= 0.1;
    document.getElementById("fuel").innerHTML = fuel;
}

function reset() {
    location.reload(true);
}

function stopGame() {
    if (juegoActivo == true) {
        motorOff();
        stop();
        juegoActivo = false;
        document.getElementById("pausa").style.display = "none";
        document.getElementById("continuar").style.display = "inline-block"
    }
}

function continueGame() {
    juegoActivo = true;
    start();
    document.getElementById("continuar").style.display = "none";
    document.getElementById("pausa").style.display = "inline-block";

}
