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

window.addEventListener("resize", rotacionMovil, false);

function tocoCanvas() {
  console.log("xd");
}
function comenzar() {
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Cargando... ", canvas.width / 2 - 100, canvas.height / 2);
  //====================================
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "recursos/laboratorio.json", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      DATOS_TILED = new DatosTiled(datos, configurarTodo);
    }
  };
}
function configurarTodo() {
  configurarJuego();
}
function configurarCanvas() {
  canvas = document.getElementById("canvas");
  canvas.addEventListener("touchstart", handleStart, false);
  canvas.addEventListener("touchend", handleEnd, false);
  canvas.addEventListener("touchmove", handleMove, false);

  ctx = canvas.getContext("2d", { willReadFrequently: true });
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
  canvas2 = document.createElement("canvas");

  ctx2 = canvas2.getContext("2d", { willReadFrequently: true });
  anchoCanvas = 900;
  altoCanvas = 620;
  canvas2.width = anchoCanvas * window.devicePixelRatio;
  canvas2.height = altoCanvas * window.devicePixelRatio;
  canvas2.style.width = `${anchoCanvas}px`;
  canvas2.style.height = `${altoCanvas}px`;
  // ctx2.fillStyle = "black";
  // ctx2.fillRect(0,0, canvas.width,canvas.height);
}

function configurarJuego() {
  JUGADOR = new Player(98, 378);
  MAPA = new Mapa(DATOS_TILED);
  MAPA.configuracionFinal();
  GESTOR_MOVIL = new ConfigMovil();
  setInterval(bucleJuego, 1000 / FPS);
  setInterval(() => {
    FPSactuales = contadorFPS;
    contadorFPS = 0;
  }, 1000);
}
function bucleJuego() {
  MAPA.actualizar();
  MAPA.dibujar(ctx);
  // GESTOR_MOVIL.dibujar(ctx);
  contadorFPS++;
}
