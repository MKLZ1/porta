class Criatura extends Ente {
  //	protected BufferedImage imagenActual;
  //Crear gestorCriaturas
  ajustePosXimagen = 0;
  ajustePosYimagen = 0;
  solicitudesMov = 0;
  transformaciones = [];
  transActual;
  ultimaTrans;
  cazadores = [];
  objetivo;
  capaParasito;
  temporizadoresDescanso = [];
  direccionBloqueada = false;
  vidaMax = 400;
  vidaActual = 0;
  ataquesRecibidos = [];
  ataquesRemover = [];
  contador = 0;
  temporizador = new Temporizador();
  esDifunto = false;
  ataquesRecibidosTemporal = [];
  ultimaDireccionImagen;
  direccionImagen;
  dirImagenBloqueadas = [];
  animacionBidirencional = false;
  static contadorIdGlobal = 0;
  temporizadores =[];
  transicionActivada;
  imagenActual;
  static contadorCreacion = 0;
  idCreacion;
  constructor(anchoCuadroColision, altoCuadroColision, id) {
    super(anchoCuadroColision, altoCuadroColision, id);
    this.temporizador.setTiempoMaximo(180);
    this.vidaMax = this.vidaActual = 10000;
    this.direccionImagen = this.ultimaDireccionImagen = this.direccion;
    this.idGlobal = Criatura.contadorIdGlobal++;
    this.idCreacion = Mapa.generarIdCreacion();
    
  }
  getIdCreacion(){
    return this.idCreacion;
  }
  bloquearDirImagen(direcciones){
    this.dirImagenBloqueadas = direcciones;
  }
  getBacteria(){
    return MAPA.getMapaBacteria().getBacteriaPosMapa(
    this.registroMov.getX(),
    this.registroMov.getY());
  }
  getPeso() {
    if (this.objetivo == null) this.calcularObjetivo();

    return this.objetivo.getCapaParasito().getPeso(this.getBacteria().bloqueT);
  }
  getCapaParasitoObjetivo(){
    if (this.objetivo == null) this.calcularObjetivo();
    return this.objetivo.getCapaParasito();
  }
  setCapaParasito(capaParasito) {
    this.capaParasito = capaParasito;
  }
  getCapaParasito() {
    return this.capaParasito;
  }
  recibirAtaque(ataque) {
    if (!this.existeAtaque(ataque)) {
      if (!this.transActual.getEstadoActual().getTipo() === "defensa") {
        this.aumentarVida(-ataque.getHurt());
      }

      this.ataquesRecibidos.add(ataque);
    }
  }
  aumentarVida(vida) {
    this.vidaActual += vida;
    if (this.vidaActual <= 0) {
      this.vidaActual = 0;
      // GestorJuego.MAPA.getGestorCriaturas().configurarSemiDifunto(this);
    }
  }
  intentarRemoverAtaquesRecibidos() {
    this.ataquesRecibidosTemporal.push(...this.ataquesRecibidos);

    for (let ac of this.ataquesRecibidos) {
      if (!ac.activo) {
        removeItemFromArr(this.ataquesRecibidosTemporal, ac);
      }
    }
    this.ataquesRecibidos.length = 0;
    this.ataquesRecibidos.push(...this.ataquesRecibidosTemporal);
  }
  existeAtaque(ataque) {
    for (let ac of ataquesRecibidos) {
      if (ac === ataque) {
        return true;
      }
    }
    return false;
  }
  setObjetivo(objetivoNuevo) {
    if (this.objetivo != null) this.objetivo.getCazadores().remove(this);

    objetivoNuevo.getCazadores().add(this);
    this.objetivo = objetivoNuevo;
  }
  estaEmparejado() {
    if (this.objetivo == null) return false;
    if (this.objetivo.getObjetivo() !== this) return false;

    return true;
  }
  calcularObjetivo() {
    this.objetivo = JUGADOR;
  }
  actualizarMov() {}
  actualizar() {
   
    super.actualizar();
    this.calcularObjetivo();
    this.intentarRemoverAtaquesRecibidos();
    this.temporizador.actualizar();
    this.actualizarMov();

    //======================
    this.actualizarTemporizadores();
    if(this.transicionActivada==null){
      this.transActual.actualizar();
      this.transActual.actualizarImagenActual();
      this.imagenActual = this.transActual.getImagenActual();

      let transicion = this.transActual.getTransicionActivable();
      if(transicion!=null){
        this.transActual.accionFinal();
        this.setTransformacioActual(transicion.getTransformacionDestino());
        transicion.accionInicial();
        this.transicionActivada = transicion;
      }
    }else{
      this.transicionActivada.actualizar();
      this.imagenActual = this.transicionActivada.getImagenActual();
      
      if(this.transicionActivada.tiempoCumplido()){
        this.transicionActivada = null;
      }
    }
    //==================
    if(this.animacionBidirencional){

      if(this.getVectorDirMov().x===0&&this.getVectorDirMov().y!==0){
        this.direccionImagen = this.ultimaDireccionImagen;
      }else if(this.getVectorDirMov().x!==0){
        this.ultimaDireccionImagen = this.direccionImagen;
        this.direccionImagen = this.getVectorDirMov().x>0?2:6;
      }
    }else{
      this.ultimaDireccionImagen = this.direccionImagen;
        this.direccionImagen = this.direccion;
    }

  }
 
  getVectorDirMov(){
    
  }
  estaQuieto(){
    
  }
  addTransformacion(transformacion) {
    this.transformaciones.push(transformacion);
    if (this.transformaciones.length == 1) {
      this.setTransformacioActual(transformacion);
    }
  }
  setTransformacioActual(transformacion){
      this.transActual = transformacion;
      this.transActual.accionInicial();
  }
  agregarTemporizadorDescanso(temporizador) {
    let existe = false;
    for (let t of this.temporizadoresDescanso) {
      if (t === temporizador) {
        existe = true;
        break;
      }
    }
    if (!existe && temporizador.estaConfigurado()) {
      this.temporizadoresDescanso.push(temporizador);
    }
  }
  addTemporizador(t){
    this.temporizadores.push(t);
  }
  actualizarTemporizadores(){
    for(let i = 0; i < this.temporizadores.length; i++){
      this.temporizadores[i].actualizar();
    }
  }
  calcularTransformacion() {
    let transEnlazeActiva = this.transActual.getTransEnlazeActivo();
    if(transEnlazeActiva != null) {
      this.transActual.getTemporizadorDescanso().reiniciar();
      let transNueva = transEnlazeActiva.getTrans();
      transNueva.accionInicial();

      transEnlazeActiva.prepararTransicion();
      transNueva.iniciarTransicion();
      this.transActual.getEstadoActual().accionFinal();
      this.ultimaTrans = this.transActual;
      this.transActual = transNueva;
    }
    this.transActual.actualizarEstadoNormal();
  }
  comenzarCambioTransformacion(transicion){
    // this.transActual.accionFinal();
    // //cambiar a getTranformacionFinal
    // let transformacionNueva = transicion.getTrans();
    // transformacionNueva.accionInicial();

    // transicion.prepararTransicion();
    // transformacionNueva.iniciarTransicion();
    // this.transActual.getEstadoActual().accionFinal();
    // this.ultimaTrans = this.transActual;
    // this.transActual = transNueva;
  }
  getTrans(id) {
    for (let tp of this.transformaciones) if (id == tp.getID()) return tp;
    return null;
  }

  getEstadoActual() {
    return this.transActual.getEstadoActual();
  }

  //=========================================================================================

  dibujar(graficos) {
 
    if (this.imagenActual == null) {
      return;
    }
    
    this.colision.dibujar(graficos,"red");
    // graficos.drawStringMapa("Vida : "+this.vidaActual, registroMov.getX()-30, registroMov.getY()-50+ajustePosYimagen, Color.WHITE);
    let posX = parseInt(
      this.registroMov.getX() -
        this.imagenActual.width / 2 +
        this.ajustePosXimagen
    );
    let posY = parseInt(
      this.registroMov.getY() -
        this.imagenActual.height / 2 +
        this.ajustePosYimagen
    );
    graficos.drawImage(this.imagenActual,posX,posY);
    // this.transActual.dibujar(posX, posY, graficos);
    
  }

  setSolicitudesDeMov(direccion, distanciaTile) {}
  solicitudMovCompletada() {}
  getEstado() {
    return this.transActual.getEstadoActual().getNombre();
  }

  setAjustePXimagen(ajusteX) {
    this.ajustePosXimagen = ajusteX;
  }
  setAjustePYimagen(ajusteY) {
    this.ajustePosYimagen = ajusteY;
  }
  getYorden() {
    return parseInt(this.registroMov.getY());
  }
  getBacteria() {
    return MAPA.getMapaBacteria().getBacteriaPosMapa(
      this.registroMov.getX(),
      this.registroMov.getY()
    );
  }
  getObjetivo(){
      return this.objetivo;
  }
}
