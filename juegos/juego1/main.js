//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;


//audios
let click =new Audio('../sonidos/click.mp3');
let correcto =new Audio('../sonidos/correcto.mp3');
let incorrecto =new Audio('../sonidos/incorrecto.mp3');
let gano =new Audio('../sonidos/gano.mp3');
let perdio =new Audio('../sonidos/perdio.mp3');




//apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempoRestante');

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

//funcion contar tiempo
function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
            perdio.play();
            document.getElementById('btn').style.display = 'block';
        }
    }, 1000)
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./iconos/${numeros[i]}.png" alt="icons">`;
        tarjetaBloqueada.disabled = true;
    }
}

//funcion principal

function destapar(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;
        tarjeta1.innerHTML= `<img src="./iconos/${primerResultado}.png" alt="icons">`;
        click.play();

        //desabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        tarjeta2.innerHTML= `<img src="./iconos/${segundoResultado}.png" alt="icons">`;

        //desabilitar primer boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            //encerrar contador de tarjetas destapadas
            tarjetasDestapadas = 0;
            //aumentar aciertos
            aciertos++;
            correcto.play();
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱🥳🎉`;
                mostrarTiempo.innerHTML = `Fantastico  🎉 solo te demoraste: ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎 `;
                document.getElementById('btn').style.display = 'block';
                gano.play();
            }

        } else {
            //mostrar momentaneamente valores y taparlos
incorrecto.play();
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }


    }
}