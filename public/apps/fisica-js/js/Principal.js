let canvas;
var canvas2;
var FPS = 60;
var contadorFPS = 0;
var FPSactuales = 40;
var JUGADOR;
var MAPA;
var DATOS_TILED;
var GESTOR_MOVIL;
let CANVAS_ANCHO = 450;
let CANVAS_ALTO = 250;
let ctx = null;
var ctx2 = null;
var senos = [];
var cosenos = [];
var radSum;
var fisica;

window.addEventListener("resize", rotacionMovil, false);

function tocoCanvas() {
  // console.log("xd");
}
document.onmousemove = handleMouseMove;
function comenzar() {
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  // ctx.fillText(
  //   "Cargando . . . ",
  //   window.innerHeight / 2 - 100,
  //   window.innerWidth / 2
  // );

  // console.log("EL CANVAS CONFIGURADO?? ", canvas);
  fisica = new Fisica();
  configurarTodo();
  //====================================
  // const xhttp = new XMLHttpRequest();

  // xhttp.open("GET", "recursos/bosque.json", true);
  // xhttp.send();
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     let datos = JSON.parse(this.responseText);
  //     DATOS_TILED = new DatosTiled(datos, configurarTodo);
  //   }
  // };
}
function configurarTodo() {
  configurarJuego();
}
function configurarCanvas() {
  canvas = document.getElementById("canvas");
  canvas.addEventListener("touchstart", handleStart, false);
  canvas.addEventListener("touchend", handleEnd, false);
  canvas.addEventListener("touchmove", handleMove, false);

  ctx = canvas.getContext("2d");
  let anchoCanvas = window.innerWidth;
  let altoCanvas = window.innerHeight;
  canvas.width = anchoCanvas * window.devicePixelRatio;
  canvas.height = altoCanvas * window.devicePixelRatio;
  canvas.style.width = `${anchoCanvas}px`;
  canvas.style.height = `${altoCanvas}px`;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //=======================
  //=============================
  // canvas2 = document.createElement("canvas");

  // ctx2 = canvas2.getContext("2d");
  // anchoCanvas = 900;
  // altoCanvas = 620;
  // canvas2.width = anchoCanvas*window.devicePixelRatio;
  // canvas2.height = altoCanvas*window.devicePixelRatio;
  // canvas2.style.width = `${anchoCanvas}px`;
  // canvas2.style.height = `${altoCanvas}px`;
  // ctx2.fillStyle = "black";
  // ctx2.fillRect(0,0, canvas.width,canvas.height);
}

function configurarJuego() {
  // JUGADOR = new Player(626, 1676);
  // MAPA = new Mapa(DATOS_TILED);
  // // MAPA.configuracionFinal();
  GESTOR_MOVIL = new ConfigMovil();
  // let numCalculos = 1000000;
  // radSum = Math.PI / 2 / numCalculos;
  // for (let i = 0; i < numCalculos; i++) {
  //   senos[i] = Math.sin(i * radSum);
  // }
  // Math.sin = senoDe;
  setInterval(bucleJuego, 1000 / FPS);
  setInterval(() => {
    FPSactuales = contadorFPS;
    contadorFPS = 0;
  }, 1000);
}
function senoDe(angulo) {
  let signo = 1;
  angulo = (180 * angulo) / Math.PI;
  if (angulo >= 360) {
    angulo -= 360 * parseInt(angulo / 360);
  }
  if (angulo < 0) {
    angulo -= 360 * parseInt(angulo / 360);
    angulo += 360;
  }
  if (angulo > 90 && angulo <= 180) {
    angulo -= 90;
    angulo = 90 - angulo;
  } else if (angulo > 180 && angulo <= 270) {
    angulo -= 180;
    signo = -1;
  } else if (angulo > 270) {
    angulo -= 270;
    angulo = 90 - angulo;
    signo = -1;
  }
  let rad = (Math.PI * angulo) / 180;

  if (angulo == 90) {
    return 1;
  }
  return signo * senos[Math.round(rad / radSum)];
}
async function bucleJuego() {
  // MAPA.actualizar();
  // canvas.width = canvas.width;
  // canvas.height = canvas.height;
  fisica.actualizar();
  // console.log("DIBUJANDO");
  fisica.dibujar(ctx);

  // MAPA.dibujar(ctx);
  // GESTOR_MOVIL.dibujar(ctx);
  contadorFPS++;
}
