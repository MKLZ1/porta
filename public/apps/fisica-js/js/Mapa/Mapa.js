class Mapa {
  movXinicial;
  movYinicial;
  registroMovCentral;
  registroMovCamara = new Point();

  imagenMapa;
  camaraMapa;
  gestorCriaturas;
  koro;
  matrizColisiones;
  enemigos = [];
  gLineaBacteriaV = new GestorLineaBacteria(JUGADOR,4);
  gLineaBacteriaH = new GestorLineaBacteria(JUGADOR,2);
  cruzBacteria = new CruzBacteria(JUGADOR);
  proyectiles = [];
  static contadorIdCreacion = 0;
  semiMuertos = [];
  fisica = new Fisica();
  constructor(datosTiled) {
    // this.ancho = datosTiled.anchoMapa;
    // this.alto = datosTiled.altoMapa;
    // this.anchoTile = this.ancho / 32;
    // this.altoTile = this.alto / 32;

    // this.colisionesTile = datosTiled.colisiones;
    // this.matrizColisiones = [];
    // this.configMatrizColisiones();
    // this.imagenMapa = datosTiled.imagenMapa;
    // this.tamTile = 32;
    // this.objetosDibujo = datosTiled.objetosDibujo;
    // this.objetosDibujo.push(JUGADOR);    
    // this.registroMovCentral = JUGADOR.getRegistroMov();

    // // this.gestorCriaturas = new GestorCriaturas(this);
    // //=========================
    // this.lineasColisionSombra = [];
    // for (let colision of this.colisionesTile) {
    //   this.lineasColisionSombra.push(...colision.getLineas());
    // }    
  }
  static generarIdCreacion(){
    return Mapa.contadorIdCreacion++;
  }
  configSemiMuerto(enemigo){
    this.semiMuertos.push(enemigo);
    removeItemFromArr(this.enemigos,enemigo);
  }
  quitarSemiMuerto(enemigo){
    removeItemFromArr(this.objetosDibujo,enemigo);
    removeItemFromArr(this.semiMuertos,enemigo);
  }
  addProyectil(p){
    this.objetosDibujo.push(p);
    this.proyectiles.push(p);
  }
  quitarProyectil(p){
    removeItemFromArr(this.proyectiles,p);
    removeItemFromArr(this.objetosDibujo,p);
  }
  addEnemigo(id, posX, posY) {
    let enemigo = crearEnemigo(id);
    enemigo.configurarPosicion(posX,posY);
    this.objetosDibujo.push(enemigo);
    this.enemigos.push(enemigo);
  }
  configMatrizColisiones() {
    let anchoC;
    let altoC;
    let posXini;
    let posYini;
    for (let c of this.colisionesTile) {
      posXini = c.getX() / 32;
      posYini = c.getY() / 32;
      anchoC = c.getAncho() / 32;
      altoC = c.getAlto() / 32;
      for (let y = 0; y < altoC; y++) {
        for (let x = 0; x < anchoC; x++) {
          this.matrizColisiones[
            posXini + x + (posYini + y) * this.anchoTile
          ] = c;
        }
      }
    }
  }
  configuracionFinal() {
    this.mapaBacteria = new MapaBacteria(this, 1000000);
    JUGADOR.setCapaParasito(this.mapaBacteria.crearCapaParasito(JUGADOR));
    this.camaraMapa = new CamaraMapa(this.registroMovCentral,this.imagenMapa,this.objetosDibujo,this.mapaBacteria.puntosEsquina,this.ancho,this.alto);
    this.camaraMapa.setGeneradorSombra(new GeneradorSombra(this.registroMovCentral, this.mapaBacteria.puntosEsquina,this.colisionesTile));
    this.comenzarAcrearEnemigos();
   
  }
  comenzarAcrearEnemigos(){
    for(let i=0; i < 10;i++){
      // this.addEnemigo(1, 626, 1676);
  
     }
          this.addEnemigo(4,709,1437);
      // for (let i = 0; i < 1; i++) {
      //   this.addEnemigo(2, 208, 378);
      // }
  }

  colisiona(colision) {
    for (let c of this.colisionesTile) {
      if (c.intersecta(colision)) {
        return true;
      }
    }
    return false;
  }
  colisionaC(posX, posY) {
    for (let c of this.colisionesTile) {
      if (
        posX >= c.getX() &&
        posX < c.getX() + c.getAncho() &&
        posY >= c.getY() &&
        posY < c.getY() + c.getAlto()
      ) {
        return true;
      }
    }
    return false;
  }
  actualizar() {
    this.fisica.actualizar();
    return;
    if(teclaPresionada("k")){
      for (let e of this.enemigos) {
        e.vidaActual = 0;
      }
    }
    if(teclaPresionada("l")){
      for (let e of this.enemigos) {
        e.vidaActual = 100;
      }
    }
    for(let sm of this.semiMuertos){
      sm.actualizar();
    }
    for(let p of this.proyectiles){
      p.actualizar();
    }
    JUGADOR.actualizar();
    // JUGADOR.actualizarImagenActual();
    this.cruzBacteria.actualizar();
    this.gLineaBacteriaV.actualizar();
    this.gLineaBacteriaH.actualizar();
    // console.log(JUGADOR.posXanterior+" "+JUGADOR.posYanterior)
    for (let e of this.enemigos) {
      e.actualizar();
    }
  
    for(let i = 0; i < this.cruzBacteria.tablaBacteriaH.lineasBacteria.length; i++){
      let lb = this.cruzBacteria.tablaBacteriaH.lineasBacteria[i];
      if(lb==null){
        objetoMostrar[i] = 0;
        continue;
      } 
      objetoMostrar[i] = this.cruzBacteria.tablaBacteriaH.lineasBacteria[i].numCriaturas();
    }

    this.camaraMapa.actualizar();
    JUGADOR.getCapaParasito().primeraVez = true;

    
    
    // this.capaParasitoOP.primeraVez = true;
  }

  dibujar(graficos) {
    this.fisica.dibujar(graficos);
    return;
    this.camaraMapa.dibujar(graficos);
    /*for(let y = 0; y < this.altoTile; y++){
      for(let x = 0; x < this.anchoTile; x++){
        if(this.matrizObjetos[x+y*this.anchoTile]==null) continue;
        let factor = 6;
        let r = new Rectangulo(100+x*factor,100+y*factor,factor,factor);
        r.dibujar(graficos,"blue");
      }
    }*/
   

  }
  getAncho() {
    return this.ancho;
  }

  getAlto() {
    return this.alto;
  }
  getAnchoTile() {
    return this.anchoTile;
  }
  getAltoTile() {
    return this.altoTile;
  }
  getGeneradorSombra() {
    return this.generadorSombra;
  }
  getObjetosDibujo() {
    return this.objetosDibujo;
  }
  getPuntosEsquina() {
    return this.mapaBacteria.puntosEsquina;
  }
  getEnemigos() {
    return this.enemigos;
  }
  getObjetosOrdenables() {
    return this.objetosOrdenables;
  }
  getCriaturas() {
    return this.criaturas;
  }
  getMapaBacteria() {
    return this.mapaBacteria;
  }
  getLineasColisionSombra() {
    return this.lineasColisionSombra;
  }
  getColisionesTile() {
    return this.colisionesTile;
  }
}
