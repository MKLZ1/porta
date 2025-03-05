class EstadoJugador {
  nombre;
  animadores = new GestorAnimadores();
  animadorActual;
  criatura;
  velocidad = 0;
  cdActivacion;
  tmpDescanso;
  bloqueado = false;
  tipo;
  imagenActual;
  prioridad = 0;
  cdDesbloqueo;
  bloqueoInicial = false;
  permitirTransicion = false;
  constructor(nombre, tipo, criatura, cdActivacion, tiempoDescanso = 0) {
    this.nombre = nombre;
    this.setTipo(tipo);
    this.criatura = criatura;
    this.cdActivacion = cdActivacion;
    this.tmpDescanso = new Temporizador();
    this.tmpDescanso.setNombre(nombre);
    this.setTiempoDescanso(tiempoDescanso);
    this.tmpTiempoMinimo = new Temporizador();
    
  }
  setPermitirTransicion(b){
    this.permitirTransicion = b;
  }
  permiteTransicion(){
    return this.permitirTransicion;
  }
  setTiempoMinimo(tiempoMinimo){
    this.tmpTiempoMinimo.setTiempoMaximo(tiempoMinimo);
  }
  setNombre(nombre){
    this.nombre = nombre;
  }
  setTipo(tipo){
    this.tipo = tipo;
    switch (tipo) {
      case "muerte":
        this.prioridad = 100
        break;
      case "ataque":
        this.prioridad = 6
        break;
      case "defensa":
        this.prioridad = 4
        break;
      case "basico":
        this.prioridad = 2;
      case "obligatorio":
        this.prioridad = 0;
      break;
    }
  }
  dejarEstado(){
    this.tmpDescanso.reiniciar();
  }
  setCriatura(criatura){
    this.criatura = criatura;
  }
  setCondicionActivacion(condicion){
    this.cdActivacion = condicion;
  }
  setTiempoDescanso(tiempo){
    this.tmpDescanso.setTiempoMaximo(tiempo);
    this.tmpDescanso.setContador(this.tmpDescanso.getTiempoMaximo());
  }
  bloquear(){
    this.bloqueado = true;
  }
  desbloquear(){
    if(this.bloqueado){
      this.bloqueado = false;
      this.eventoDesbloqueo();
    }
  }
  estaBloqueado() {
    return this.bloqueado;
  }
  puedeActivarse(){
    return this.cdActivacion() && this.tmpDescanso.tiempoCumplido();
  }
  cumpleCondicionActivacion() {
    return this.cdActivacion() && this.tmpDescanso.tiempoCumplido();
  }
  setVelocidad(velocidad) {
    this.velocidad = velocidad;
  }
  addAnimador(animador, nombre) {
    this.animadores.addAnimador(animador, nombre);
    if (this.animadorActual == null) {
      this.animadorActual = animador;
    }
  }
  getAnimador(nombre) {
    return this.animadores.getAnimador(nombre);
  }
  getGestorAnimadores() {
    return this.animadores;
  }
  setAnimadorActual(nombre) {
    this.animadorActual = this.animadores.getAnimador(nombre);
  }
  getNombre() {
    return this.nombre;
  }
  bloquearAlIniciar(b){
    this.bloqueoInicial = b;
  }
  desbloquearCuando(cdDesbloqueo){
    this.cdDesbloqueo = cdDesbloqueo;
  }
  eventoDesbloqueo(){

  }
  actualizarTodo(){
    if(this.estaBloqueado()&&this.tmpTiempoMinimo.getTiempoMaximo()!=0){
      this.tmpTiempoMinimo.actualizar();
      if(this.tmpTiempoMinimo.tiempoCumplido()){
        this.desbloquear();
      }
    }
    if(this.estaBloqueado()&&this.cdDesbloqueo!=null&&this.cdDesbloqueo()){
      this.desbloquear();
    }
    this.actualizar();
  }
  actualizar(){}
  accionInicial() {
    this.inicio();
    this.criatura.setVelocidadActual(this.velocidad);
    this.criatura.setReduccionVelocidad(0);

    if(this.tmpTiempoMinimo.getTiempoMaximo()!=0 || this.bloqueoInicial){
        this.bloquear()
    }

  }
  inicio(){}
  interrumpeBloqueo(){}
  accionFinal() {
    this.tmpDescanso.reiniciar();
    this.tmpTiempoMinimo.reiniciar();
    if(this.estaBloqueado()){
      this.desbloquear();
      this.interrumpeBloqueo();
    }
  }
  getAnimadorActual() {
    return this.animadorActual;
  }
  getImagenActual() {
    return this.imagenActual;
  }
  getTemporizadorDescanso() {
    return this.tmpDescanso;
  }
  actualizarImagen() {
    
    this.imagenActual = this.animadorActual.getImagen(
      this.criatura.direccionImagen
    );
  }
  dibujar(posX, posY, graficos) {
    graficos.drawImage(this.imagenActual, posX, posY);
  }
}
