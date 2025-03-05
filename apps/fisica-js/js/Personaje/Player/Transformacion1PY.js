class Transformacion1PY extends Transformacion {
  constructor(jugador) {
    super(1, 0, jugador);
    this.addEstadoQuietoOBL(getAnimacion("JG_Quieto"));
    let condicionMoviendose = () => teclasMovActiva() || estaTocandoPantalla;
    this.addEstadoMoviendoseOBL(getAnimacion("JG_MOV"),5);
    
  }
}
