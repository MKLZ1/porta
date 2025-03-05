function crearEnemigo(id) {
  switch (id) {
    case 1:
      return new KR_NJ();
    case 2:
      return new Tripulante();
    case 3:
      return new Fast();
  }
}
