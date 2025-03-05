var animaciones = new Map();
function getAnimacion(nombre) {
  return animaciones.get(nombre).clonar();
}

function cargarAnimaciones() {
  let animacion = new Animador(getHojaSprites("Jugador"), 7);
  animacion.setAnimacion(2, [1, 2, 3, 4]);
  animacion.setAnimacion(6, [6, 7, 8, 9]);
  animaciones.set("JG_MOV", animacion);
  animacion = new Animador(getHojaSprites("Jugador"), 7);
  animacion.setAnimacion(2, [0]);
  animacion.setAnimacion(6, [5]);
  animaciones.set("JG_Quieto", animacion);
  //=========ANIMACIONES KORO ===========================
  let transformacion1_quieto = new Animador(getHojaSprites("KR_hjBasico"), 12);
  transformacion1_quieto.setAnimacion(2, [2]);
  transformacion1_quieto.setAnimacion(6, [3]);
  transformacion1_quieto.setAnimacion(0, [1]);
  transformacion1_quieto.setAnimacion(4, [0]);
  animaciones.set("KR_transformacion1_quieto", transformacion1_quieto);

  let transformacion1_moviendose = new Animador(
    getHojaSprites("KR_hjBasico"),
    8
  );
  transformacion1_moviendose.setAnimacion(2, [6, 2, 10, 2]);
  transformacion1_moviendose.setAnimacion(6, [7, 3, 11, 3]);
  transformacion1_moviendose.setAnimacion(0, [5, 1, 9, 1]);
  transformacion1_moviendose.setAnimacion(4, [4, 0, 8, 0]);
  animaciones.set("KR_transformacion1_moviendose", transformacion1_moviendose);

  let transformacion2_moviendose = new Animador(getHojaSprites("KR_T2"), 10);
  transformacion2_moviendose.setAnimacion(2, [2, 6, 10, 14]);
  transformacion2_moviendose.setAnimacion(6, [3, 7, 11, 15]);
  transformacion2_moviendose.setAnimacion(0, [5, 9, 1]);
  transformacion2_moviendose.setAnimacion(4, [4, 8, 0]);
  animaciones.set("KR_T2_MOV", transformacion2_moviendose);

  let embestida = new Animador(getHojaSprites("KR_T3"), 6);
  embestida.setAnimacion(2, [2, 6, 10, 14]);
  embestida.setAnimacion(6, [3, 7, 11, 15]);
  embestida.setAnimacion(0, [1, 5, 9, 13]);
  embestida.setAnimacion(4, [0, 4, 8, 12]);
  animaciones.set("KR_T3", embestida);

  let muerte = new Animador(getHojaSprites("KR_T1_muerte"), 8, true);
  muerte.setAnimacion(2, [0, 1, 2]);
  muerte.setAnimacion(6, [0, 1, 2]);
  muerte.setAnimacion(0, [0, 1, 2]);
  muerte.setAnimacion(4, [0, 1, 2]);
  animaciones.set("KR_T1_muerte", muerte);

  let t1_t2 = new Animador(getHojaSprites("KR_T1_T2"), 3, true);
  t1_t2.setAnimacion(2, [2, 6, 10, 14]);
  t1_t2.setAnimacion(6, [3, 7, 11, 15]);
  t1_t2.setAnimacion(0, [1, 5, 9, 13]);
  t1_t2.setAnimacion(4, [0, 4, 8, 12]);
  animaciones.set("KR_T1_T2", t1_t2);

  let t2_t1 = new Animador(getHojaSprites("KR_T1_T2"), 3, true);
  t2_t1.setAnimacion(2, [14, 10, 6, 2]);
  t2_t1.setAnimacion(6, [15, 11, 7, 3]);
  t2_t1.setAnimacion(0, [13, 9, 5, 1]);
  t2_t1.setAnimacion(4, [12, 8, 4, 0]);
  animaciones.set("KR_T2_T1", t2_t1);

  let t2_basico = new Animador(getHojaSprites("KR_T1_T2"), 7, true);
  t2_basico.setAnimacion(2, [14]);
  t2_basico.setAnimacion(6, [15]);
  t2_basico.setAnimacion(0, [13]);
  t2_basico.setAnimacion(4, [12]);
  animaciones.set("KR_T2_basico", t2_basico);

  // let fast_t1_basico_moviendose = new Animador(getHojaSprites("fast_t1_basico"),7);

  // fast_t1_basico_moviendose.setAnimacion(6,[0,1,2,3,4,5,6,7,8,9,10,11]);
  // fast_t1_basico_moviendose.setAnimacion(2,[12,13,14,15,16,17,18,19,20,21,22,23]);
  // fast_t1_basico_moviendose.setAnimacion(4,[24,25,26,27]);
  // fast_t1_basico_moviendose.setAnimacion(0,[36]);
  // animaciones.set("fast_t1_basico_moviendose",fast_t1_basico_moviendose);
}
