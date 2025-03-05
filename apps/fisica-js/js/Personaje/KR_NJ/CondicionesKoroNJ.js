class CondicionesKoroNJ {
  kr;
  constructor(kr) {
    this.kr = kr;
    this.movimientoActivo = () => {return false};
    this.movimientoInactivo = () => !this.kr.mb.posibleMovimiento();
    this.huir = () =>
      !kr.estaHuyendo() && kr.getBacteria() === kr.objetivo.getBacteria();
  }
}
