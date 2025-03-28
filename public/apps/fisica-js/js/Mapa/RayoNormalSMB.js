
class RayoNormalSMB{
  lineaRayo = new Linea();
  puntaRayoHorizontal = new Point();
  puntaRayoVertical = new Point();
  tamTile = 32;
  semiModulo;
  constructor(registroMovOrigen = new Point(), angulo = 0) {
    this.registroMovOrigen = registroMovOrigen;
    this.angulo = angulo;
  }
  dibujar(graficos, color) {
    this.lineaRayo.dibujar(graficos, color);
  }
  setAngulo(angulo) {
    this.angulo = angulo;
  }
  setRegistroMovOrigen(registroMovOrigen) {
    this.registroMovOrigen = registroMovOrigen;
  }
  actualizar() {
    //Modificar despues
    let puntaRayo = this.getPuntoColisionRayo(
      this.registroMovOrigen,
      this.angulo
    );
    this.actualizarLineaRayo(puntaRayo);
    this.semiModulo = getSemiModuloPP(
      this.registroMovOrigen,
      puntaRayo
    );
  }
  getAngulo(){
    return this.angulo;
  }
  getRegistroMovOrigen(){
    return this.registroMovOrigen;
  }
  getSemiModulo(){
    return this.semiModulo;
  }
  getPuntaRayo() {
    return this.lineaRayo.getP2();
  }

  getPuntoColisionRayo(posOrigen, angulo) {
    let posColisionVertical = this.colisionVertical(posOrigen, angulo);
    let posColisionHorizontal = this.colisionHorizontal(posOrigen, angulo);

    let semiTamVertical = getSemiModuloPP(
      posOrigen,
      posColisionVertical
    );
    let semiTamHorizontal = getSemiModuloPP(
      posOrigen,
      posColisionHorizontal
    );
    
    return semiTamHorizontal<semiTamVertical?posColisionHorizontal:posColisionVertical;

  }
  colisionVertical(posOrigen, angulo) {
    let columnaActual = this.calcularPosTile(posOrigen.getX());
    let posXjugador = posOrigen.getX();
    let posYjugador = posOrigen.getY();

    let dirIzquierda = Math.cos(toRadians(angulo)) < 0;
    let posXrevision = 0;

    let desplazamientoX = 0;
    let desplazamientoY = 0;
    if (dirIzquierda) {
      posXrevision = columnaActual * this.tamTile - 1;
      desplazamientoX = -this.tamTile;
    } else {
      posXrevision = (columnaActual + 1) * this.tamTile;
      desplazamientoX = this.tamTile;
    }
    let posYrevision =
      posYjugador - (posXrevision - posXjugador) * Math.tan(toRadians(angulo));

    desplazamientoY = -desplazamientoX * Math.tan(toRadians(angulo));

    this.puntaRayoVertical.setLocation(posXrevision, posYrevision);
    this.desplazarPuntaRayo(
      this.puntaRayoVertical,
      desplazamientoX,
      desplazamientoY
    );

    return this.puntaRayoVertical;
  }
  colisionHorizontal(posOrigen, angulo) {
    let filaActual = this.calcularPosTile(posOrigen.getY());
    let posXjugador = posOrigen.getX();
    let posYjugador = posOrigen.getY();

    let dirAbajo = Math.sin(toRadians(angulo)) < 0;
    let posYrevision = 0;

    let desplazamientoY = 0;
    let desplazamientoX = 0;

    if (!dirAbajo) {
      posYrevision = filaActual * this.tamTile - 1;
      desplazamientoY = -this.tamTile;
    } else {
      posYrevision = (filaActual + 1) * this.tamTile;
      desplazamientoY = this.tamTile;
    }

    let posXrevision =
      posXjugador - (posYrevision - posYjugador) / Math.tan(toRadians(angulo));

    desplazamientoX = -desplazamientoY / Math.tan(toRadians(angulo));

    this.puntaRayoHorizontal.setLocation(posXrevision, posYrevision);
    this.desplazarPuntaRayo(
      this.puntaRayoHorizontal,
      desplazamientoX,
      desplazamientoY
    );

    return this.puntaRayoHorizontal;
  }
  desplazarPuntaRayo(puntaRayo, desX, desY) {
    while (
      puntaRayo.getX() >= 0 &&
      puntaRayo.getX() < MAPA.getAncho() &&
      puntaRayo.getY() >= 0 &&
      puntaRayo.getY() < MAPA.getAlto()
    ) {
      if (
        this.puntoColisiona(
          this.ajustarValor(puntaRayo.getX()),
          this.ajustarValor(puntaRayo.getY())
        )
      ) {
        break;
      }
      puntaRayo.setLocation(puntaRayo.getX() + desX, puntaRayo.getY() + desY);
    }

    puntaRayo.setLocation(
      this.ajustarValor(puntaRayo.getX()),
      this.ajustarValor(puntaRayo.getY())
    );
  }
  ajustarValor(valor) {
    let valorModificado = Math.abs(valor);

    if (parseInt(valor) + 1 - valor < 1e-10) {
      valorModificado = parseInt(valor) + 1;
      if (valor < 0) {
        return -valorModificado;
      } else {
        return valorModificado;
      }
    } else if (valor - parseInt(valor) < 1e-10) {
      return parseInt(valor);
    } else {
      return valor;
    }
  }
  puntoColisiona(posX, posY) {
    return MAPA.colisionaC(posX, posY);
  }
  calcularPosTile(pos) {
    return parseInt(pos / 32);
  }
  actualizarLineaRayo(posPunta) {
    this.lineaRayo.setLineP(this.registroMovOrigen, posPunta);
  }
}
