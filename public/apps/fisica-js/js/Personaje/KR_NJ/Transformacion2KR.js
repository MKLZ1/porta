class Transformacion2KR extends Transformacion {
  constructor(kr, tiempoDescanso, condiciones) {
    super(2, tiempoDescanso, kr);
    this.addEstadoQuietoOBL(getAnimacion("KR_T2_basico"));
    this.addEstadoMoviendoseOBL(getAnimacion("KR_T2_basico"),8);
    // this.addEstado(new EstadoEscape(kr, condiciones.huir));
    // this.addEstado(new EstadoEmbestida(kr));
  }
}