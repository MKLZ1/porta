class RayoSMB {
  rayoPrincipalAceptado;
  rayoExtraAceptado = false;
  esRayoExtraHorario;
  anguloLineaPrincipal;
  registroMovOrigen;
  lineaRayoPrincipal;
  rayoNormalExtra;
  puntoDestinoPrincipal;
  r2d = new Rectangulo();
  lineasSombra = [];
  constructor(registroMovOrigen, puntoDestinoPrincipal, puntoOrigenRayoExtra) {
    this.registroMovOrigen = registroMovOrigen;
    this.puntoDestinoPrincipal = puntoDestinoPrincipal;
    this.rayoNormalExtra = new RayoNormalSMB(puntoOrigenRayoExtra, 0);
    this.lineaRayoPrincipal = new Linea();
  }

  lineaRayoPrChoca(lineaRayoPr) {
    let puntoDestino = lineaRayoPr.getP2();
    for (let l of MAPA.getLineasColisionSombra()) {
      if (l.intersectaLinea(lineaRayoPr)) {
        if (this.esLineaCruz(l)) {
          if (!this.puntoDentroDeLineaCruz(l, puntoDestino)) return true;

        } else if (!this.esPuntoLateral(l, puntoDestino)) {
          return true;
        }
      }
    }

    return false;
  }

  esLineaCruz(linea) {
    return linea.getX1() == linea.getX2() || linea.getY1() == linea.getY2();
  }
  esPuntoLateral(linea, punto) {
    return punto.equals(linea.getP1()) || punto.equals(linea.getP2());
  }
  puntoDentroDeLineaCruz(lineaCruz, punto) {
    if (punto.getX() == lineaCruz.getX1()) {
      let yMenor = Math.min(lineaCruz.getY1(), lineaCruz.getY2());
      let yMayor = Math.max(lineaCruz.getY1(), lineaCruz.getY2());
      return punto.getY() >= yMenor && punto.getY() <= yMayor;
    } else if (punto.getY() == lineaCruz.getY1()) {
      let xMenor = Math.min(lineaCruz.getX1(), lineaCruz.getX2());
      let xMayor = Math.max(lineaCruz.getX1(), lineaCruz.getX2());
      return punto.getX() >= xMenor && punto.getX() <= xMayor;
    }
    return false;
  }

  dibujar(graficos) {
    if (this.rayoPrincipalAceptado) {
      this.lineaRayoPrincipal.dibujar(graficos, "blue");
        if(this.rayoExtraAceptado){
            this.rayoNormalExtra.dibujar(graficos,"magenta");
        }
    }
  }

  getAngulo() {
    return this.anguloLineaPrincipal;
  }
  getRayoExtra() {
    return this.rayoNormalExtra;
  }
  getPuntoDestino() {
    return this.puntoDestinoPrincipal;
  }
  esRayoExtraAceptado() {
    return this.rayoExtraAceptado;
  }
}
