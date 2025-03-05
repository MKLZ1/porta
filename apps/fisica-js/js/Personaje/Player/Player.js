
class Player extends Criatura{
  vectMov = { x: 0, y: 0 };
  capaParasito;
  uDiagonal = 1/Math.sqrt(2);
  numerosV =[];
  // imagenRifle;
  // imagenRifle2;
  rifle_mn;
  constructor( x, y) {
    super(23,22);
    this.setPosMapa(x,y);
    this.addTransformacion(new Transformacion1PY(this));
    this.setAjustePYimagen(-15);
    this.bloquearDirImagen([0,4]);
    this.animacionBidirencional = true;
    this.rifle_mn = new Rifle_mn(this,0,-10,()=>teclaPresionada("x"));
    // cargarImagen("recursos/rifle_mn.png").then(img=>this.imagenRifle = img); 
    // cargarImagen("recursos/rifle_mn_2.png").then(img=>this.imagenRifle2 = img); 

  }

 
  calcularVectorMov() {
    this.vectMov.x = 0;
    this.vectMov.y = 0;
    if (teclaPresionada("arrowUp")) {
      this.vectMov.y = -1;
    } else if (teclaPresionada("arrowDown")) {
      this.vectMov.y = 1;
    }

    if (teclaPresionada("arrowLeft")) {
      this.vectMov.x = -1;
    } else if (teclaPresionada("arrowRight")) {
      this.vectMov.x = 1;
    }
    if(teclaPresionada("t")){
      this.vectMov.x = 1;
      this.vectMov.y = 1;
    }
    if(this.vectMov.x!=0&&this.vectMov.y!=0){
      this.vectMov.x*=this.uDiagonal;
      this.vectMov.y*=this.uDiagonal;
    }
    
  }
  actualizar(){
    super.actualizar();
    if(teclaPresionada("x")){
     
      this.rifle_mn.activarObjetivoCriatura(this.getEnemigoCercano());
    }else{
      this.rifle_mn.activarReposo();
    }
    this.rifle_mn.actualizar();
  }
  getEnemigoCercano(){
    let enemigoCercano;
    let semiModuloCercano;
    let primeraVez = true;
    for(let i = 0; i < MAPA.enemigos.length; i++){
      let e = MAPA.enemigos[i];
      let semiModulo = getSemiModuloPP(this.getRegistroMov(),e.getRegistroMov());

      if(primeraVez&&enemigoCercano == null&&e.vidaActual>0){
        enemigoCercano = e;
        semiModuloCercano = semiModulo;
        primeraVez = false;
        continue;
      }
      // console.log("asdasd",primeraVez,semiModulo,semiModuloCercano,e.vidaActual)
      if(!primeraVez&&semiModulo<semiModuloCercano&&e.vidaActual>0){
        semiModuloCercano = semiModulo;
        enemigoCercano = e;
      }
      

    }
    if(enemigoCercano == null){
      enemigoCercano = MAPA.enemigos[0];
    }
    return enemigoCercano;
  }
  dibujar(graficos){
    // graficos.imageSmoothingEnabled = false;
    super.dibujar(graficos);
    this.rifle_mn.dibujar(graficos);
    // let dx = MAPA.enemigos[0].getX() - this.getX();
    // let dy = MAPA.enemigos[0].getY() - this.getY();
    // let angulo = calcularAnguloPantallaC(0,0,dx,dy);
    // if(angulo < 270 && angulo > 90){
    //   dibujarImagenCentrada(this.imagenRifle2,parseInt(this.getX()),parseInt(this.getY()-14),angulo+180,graficos);
    // }else{
    //   dibujarImagenCentrada(this.imagenRifle,parseInt(this.getX()),parseInt(this.getY()-14),angulo,graficos);
    // }
    // graficos.drawImage(this.imagenRifle,parseInt(this.getX()-28),parseInt(this.getY()-38));
  }
  getVectorDirMov(){
    return this.vectMov;
  }

  actualizarMov() {
    this.vectMov.x =0 ;
    this.vectMov.y = 0;
    if(!isMobile()){
      this.calcularVectorMov();
    }else if(estaTocandoPantalla){      
        this.vectMov.x = GESTOR_MOVIL.vectMovU.x;
        this.vectMov.y = GESTOR_MOVIL.vectMovU.y;
    }
    if(this.vectMov.x==0&&this.vectMov.y==0){
      return;
    }
    this.actualizarDireccionVect(this.vectMov.x,this.vectMov.y);
    this.moverse();  
    this.actualizarNumerosV();
    
  }
  estaQuieto(){
    return this.vectMov.x==0&&this.vectMov.y==0;
  }
  actualizarNumerosV(){
    let vecino = this.getBacteria().getVecino(6);
    if(vecino!=null){
      this.numerosV[0] = vecino.numeroV;
    }else{
      this.numerosV[0] = null;
    }
    this.numerosV[1] = this.getBacteria().numeroV;

    vecino = this.getBacteria().getVecino(2);
    if(vecino!=null){
      this.numerosV[2] = vecino.numeroV;
    }else{
      this.numerosV[2] = null;
    }

    
  }
  moverse() {
    let desX = this.vectMov.x * this.velocidadActual;
    let desY = this.vectMov.y * this.velocidadActual;
    if(isNaN(desX)||isNaN(desY)) return;
    super.movPosColision(desX,desY);
  }
  getYorden(){
    return this.registroMov.getY();
  }
  getBacteria(){
    return MAPA.getMapaBacteria().getBacteriaPosMapa(this.registroMov.getX(),this.registroMov.getY());
  }
  setCapaParasito(capaParasito){
    this.capaParasito = capaParasito;
  }
  getCapaParasito(){
    return this.capaParasito;
  }
}
