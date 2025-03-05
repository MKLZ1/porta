class Transformacion {
  id;
  estadoActual;
  ultimoEstado;
  transformacionesEnlaze = [];
  transicionActual;
  tmpDescanso;
  criatura;
  estados = [];
  transiciones = [];
  imagenActual;
  constructor(id, tiempoDescanso, criatura) {
    this.id = id;
    this.criatura = criatura;

    this.tmpDescanso = new Temporizador(tiempoDescanso);
    this.tmpDescanso.setContador(tiempoDescanso);
    this.criatura.agregarTemporizadorDescanso(this.tmpDescanso);
  }
  addTransicion(transicion){
    this.transiciones.push(transicion);
  }
  
  getTransicionActivable(){
    if(this.estaEstadoActualBloqueado()&&!this.estadoActual.permiteTransicion()) return null;

    for(let i = 0; i < this.transiciones.length; i++){
      if(this.transiciones[i].cumpleCondicionActivacion()){
        return this.transiciones[i];
      }
    }
    return null;
  }
  addEstadoQuietoOBL(animador) {
    let estadoQuieto = new EstadoJugador("quieto", "obligatorio", this.criatura);
    estadoQuieto.setCondicionActivacion(() => this.criatura.estaQuieto());
    estadoQuieto.addAnimador(animador);
    this.addEstado(estadoQuieto);
  }
  addEstadoMoviendoseOBL(animador,velocidad=1) {
	let estadoMoviendose = new EstadoJugador("moviendose", "obligatorio", this.criatura);
    estadoMoviendose.setCondicionActivacion(() => !this.criatura.estaQuieto());
    estadoMoviendose.addAnimador(animador);
	estadoMoviendose.setVelocidad(velocidad);
    this.addEstado(estadoMoviendose);
  }
  addEstadoMuerte(animador, tiempo){
    if(tiempo == null){
      tiempo = animador.anSur.getDuracionTotal();
    }
    if(tiempo==null){
      console.log("Tiempo muerte null, posible falta de animacion en direccion sur");
    }
	  let estadoMuerte = new EstadoJugador("muerte","muerte",this.criatura);
    estadoMuerte.setCondicionActivacion(()=>this.criatura.vidaActual<=0);
	  estadoMuerte.addAnimador(animador);
    // estadoMuerte.bloquearAlIniciar(true);
    estadoMuerte.setTiempoMinimo(tiempo);
    estadoMuerte.inicio=function(){
      MAPA.configSemiMuerto(this.criatura)
    };
    estadoMuerte.eventoDesbloqueo = function(){
      MAPA.quitarSemiMuerto(this.criatura);
    }
    // estadoMuerte.desbloquearCuando(()=>this.criatura.vidaActual>0);
    this.addEstado(estadoMuerte);
  }
  actualizar() {
    let estadoNuevo = this.getEstadoActivable();
    this.setEstadoActual(estadoNuevo);
    this.estadoActual.actualizarTodo();
    
  }
  setEstadoActual(estadoNuevo) {
    if (estadoNuevo === this.estadoActual || estadoNuevo == null) return;
    if (this.estadoActual != null) {
      this.estadoActual.accionFinal();
    }
    estadoNuevo.accionInicial();
    estadoNuevo.getAnimadorActual().reiniciarAnimacion();
    this.ultimoEstado = this.estadoActual;
    this.estadoActual = estadoNuevo;
  }
  getID() {
    return this.id;
  }

  /*
    addTransEnlaze(trans,condicion,animador,tiempoTransicion) {
		let transicionTrans = new TransicionTrans(tiempoTransicion, animador);
		let transEnlaze = new TransEnlaze(trans, condicion, transicionTrans);
		this.transformacionesEnlaze.push(transEnlaze);
	}
	addTransEnlaze(trans,condicion) {
		let transEnlaze = new TransEnlaze(trans, condicion, null);
		this.transformacionesEnlaze.push(transEnlaze);
	}*/
  getTransEnlazeActivo() {
    for (let te of this.transformacionesEnlaze) {
      if (te.cumpleCondicion() && te.getTrans().tiempoDescansoCumplido()) {
        return te;
      }
    }

    return null;
  }
  getEstadoActivable() {
    let hayEstadoBloqueado = this.estaEstadoActualBloqueado();
    
    // console.log(hayEstadoBloqueado);
    for (let i = this.estados.length - 1; i >= 0; i--) {
      if (hayEstadoBloqueado&&i!==this.estados.length - 1) break;
      if (this.estados[i].puedeActivarse()) {
        
        return this.estados[i];
      }
    }

    // console.log("NO SE ENCONTRO ESTADOS ACTIVABLES, ESTADOS BASICOS MAL CONFIGURADOS O ALGUN ESTAD")
    return null;
  }
  estaEstadoActualBloqueado() {
    if (this.estadoActual == null) return false;

    return this.estadoActual.estaBloqueado();
  }
  addEstado(estado) {
    //LO INSERTAMOS DE ACUERDO A SU PRIORIDAD
    this.estados.unshift(estado);

    for (let i = 1; i < this.estados.length; i++) {
      if (this.estados[i - 1].prioridad >= this.estados[i].prioridad) {
        let aux = this.estados[i];
        this.estados[i] = this.estados[i - 1];
        this.estados[i - 1] = aux;
      } else {
        break;
      }
    }
    this.criatura.addTemporizador(estado.getTemporizadorDescanso());
  }

  getTransicion() {
    return this.transicionActual;
  }
  transicionEnProceso() {
    if (this.transicionActual == null) {
      return false;
    }
    if (this.transicionActual.transicionEnProceso == false) {
      this.transicionActual = null;
      return false;
    }
    return true;
  }
  iniciarTransicion() {
    if (this.transicionActual != null)
      this.transicionActual.iniciarTransicion();
  }

  accionInicial() {
    this.setEstadoActual(this.estados[0]);
  }
  accionFinal(){
    this.estadoActual.accionFinal();
    this.estadoActual = null;
  }
  tiempoDescansoCumplido() {
    return this.tmpDescanso.tiempoCumplido();
  }

  reiniciarTemporizador() {
    this.tmpDescanso.reiniciar();
  }
  getTemporizadorDescanso() {
    return this.tmpDescanso;
  }

  actualizarImagenActual() {
    if (this.transicionEnProceso()) {
      this.transicionActual.actualizarImagen(this.criatura.getDireccion());
      this.imagenActual = this.transicionActual.getImagenActual();
    } else {
      this.estadoActual.actualizarImagen();
      this.imagenActual = this.estadoActual.getImagenActual();
    }
  }
  getEstadoActual() {
    return this.estadoActual;
  }
  dibujar(posX, posY, graficos) {
    if (this.transicionEnProceso()) {
      this.transicionActual.dibujar(posX, posY, graficos);
    } else {
      this.estadoActual.dibujar(posX, posY, graficos);
    }
  }
  getEstado(nombre){
    for(let i = 0; i < this.estados.length;i++){
      if(this.estados[i].nombre === nombre){
        return this.estados[i];
      }
    }
    return null;
  }
  getImagenActual() {
    return this.imagenActual;
  }
}
