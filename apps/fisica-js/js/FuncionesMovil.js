var estaTocandoPantalla = false;
let mobil = 0;
var mousePosCanvas = {};

function isMobile() {
  if (mobil !== 0) return mobil;

  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/BlackBerry/i)
  );
}
function isTouchScreen() {
  return window.matchMedia("(hover: none)").matches;
}
function handleStart(evt) {
  evt.preventDefault();
  let touches = evt.changedTouches;
  GESTOR_MOVIL.reportarToquePantalla(touches[0].pageX, touches[0].pageY);
  estaTocandoPantalla = true;
}
function handleEnd(evt) {
  GESTOR_MOVIL.resetearVectorMov();
  estaTocandoPantalla = false;
}
function handleMove(evt) {
  evt.preventDefault();
  console.log("xd");
  let touches = evt.changedTouches;
  GESTOR_MOVIL.reportarToquePantalla(touches[0].pageX, touches[0].pageY);
  estaTocandoPantalla = true;
}
function oMousePosScaleCSS(canvas, posX, posY) {
  if (canvas == null) {
    return { x: 0, y: 0 };
  }
  let ClientRect = canvas.getBoundingClientRect();
  let scaleX = canvas.width / ClientRect.width;
  let scaleY = canvas.height / ClientRect.height;
  return {
    x: (posX - ClientRect.left) * scaleX,
    y: (posY - ClientRect.top) * scaleY,
  };
}

function isFullScreen() {
  let clientRect = canvas.getBoundingClientRect();
  let widthCanvas = parseInt(clientRect.width);
  let heightCanvas = parseInt(clientRect.height);

  return widthCanvas === screen.width && heightCanvas === screen.height;
}
function getOrientation() {
  var orientation =
    window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
  return orientation;
}

function openFullscreen() {
  GESTOR_MOVIL.reportarCambioPantalla(1);
  //=========================================
  var elem = document.getElementById("canvas");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
function rotacionMovil() {
  GESTOR_MOVIL?.reportarCambioPantalla(2);
}

function handleMouseMove(event) {
  var eventDoc, doc, body;

  event = event || window.event; // IE-ism

  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0);
  }

  // Use event.pageX / event.pageY here
  mousePosCanvas = oMousePosScaleCSS(canvas, event.pageX, event.pageY);
}

function getMousePosition() {
  return mousePosCanvas;
}
