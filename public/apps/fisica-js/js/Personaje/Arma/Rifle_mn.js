class Rifle_mn{
    criatura;
    desXori;
    desYori;
    desX;
    desY;
    objetivoCriatura;
    objetivoLibre;  
    anguloArma;
    imagenOri;
    imagenRev;
    imagenActual;
    cdDisparo;
    temporizador = new Temporizador(5);
    vectDesBalaInicio = new Point();
    dirImagen;
    linea = new Linea();
    lineaVerificacion = new Linea();
    constructor(criatura,desX,desY,cdDisparo){
        this.criatura  = criatura;
        this.dirImagen = criatura.getDireccion();
        this.desX = this.desXori = desX ;
        this.desY = this.desYori = desY;
        this.cdDisparo = cdDisparo;
        cargarImagen("recursos/rifle_mn.png").then(imagen=>{
            this.imagenOri = imagen;
            let canvas = document.createElement("canvas");
            canvas.width = this.imagenOri.width;
            canvas.height = this.imagenOri.height;

            let contexto = canvas.getContext("2d");
            contexto.translate(0,this.imagenOri.height);
            contexto.scale(1,-1);
            contexto.drawImage(this.imagenOri,0,0);
            this.imagenRev = canvas;

        });
        this.temporizador.setContador(60);
    }
    getXorigen(){
        return this.criatura.getX()+this.desX;
    }
    getYorigen(){
        return this.criatura.getY()+this.desY;
    }
    dibujar(graficos){
        if(this.imagenOri == null) return;
        dibujarImagenCentrada(this.imagenActual,parseInt(this.getXorigen()),parseInt(this.getYorigen()),this.anguloArma,graficos);
        this.linea.dibujar(graficos);
        this.lineaVerificacion.dibujar(graficos,"orange");
    }
    actualizarLinea(){
        this.linea.setConfig(this.getXorigen(),this.getYorigen(),this.anguloArma,47);
    }
    intentarDispararCriatura(){
        this.lineaVerificacion.setLineaCP(this.getXorigen(),this.getYorigen(),this.objetivoCriatura.getRegistroMov());
        for(let lcs of MAPA.getLineasColisionSombra()){
            if(this.lineaVerificacion.intersectaLinea(lcs)){
                this.activarReposo();
                return;
            }
        }
        let dx = this.objetivoCriatura.getX() - this.getXorigen();
        let dy = this.objetivoCriatura.getY() - this.getYorigen();
        this.anguloArma = calcularAnguloPantallaC(0,0,dx,dy);
        if(this.anguloArma>90&&this.anguloArma<270){
           this.activarEspejoImagen(true);
        }else{
            this.activarEspejoImagen(false);
        }
        this.direccionarCriatura();
    }
    actualizar(){
        this.temporizador.actualizar();

        if(this.puedeDispararCriatura()){
           this.intentarDispararCriatura();
        }

        if(!this.puedeDispararCriatura()){
            if(this.criatura.direccionImagen==2){
                this.activarEspejoImagen(false);
            }else if(this.criatura.direccionImagen==6){
                this.activarEspejoImagen(true);
            }

            if(this.puedeDispararLibremente()){
                this.anguloArma = Direccion.convertIntToAngle(this.criatura.getDireccion());
            }else{
                this.anguloArma = Direccion.convertIntToAngle(this.criatura.direccionImagen);
            }
        }
        this.actualizarLinea();
        this.intentarDisparar();
        
    }

    intentarDisparar(){
        if(!this.cdDisparo()||!this.temporizador.tiempoCumplido()||!this.puedeDispararCriatura()) return;

        //util implementar una linea y tomar la punta
        this.vectDesBalaInicio.x = Math.cos(toRadians(this.anguloArma)) * 65;
        this.vectDesBalaInicio.y = -Math.sin(toRadians(this.anguloArma)) * 65;


       MAPA.addProyectil(new Laser(this.linea.getX2(),this.linea.getY2(),this.objetivoCriatura));
        // this.temporizador.setTiempoMaximo(random(4,10));
        this.temporizador.reiniciar();
        // let snd = new Audio("recursos/disparo2.wav"); ;
        // snd.play();
    }
    
    activarObjetivoCriatura(oc){
        this.objetivoCriatura = oc;
        this.objetivoLibre = false;
    }
    puedeDispararCriatura(){
        return  this.objetivoCriatura !=null;
    }
    puedeDispararLibremente(){
        return this.objetivoLibre;
    }
    estaEnReposo(){
        return this.objetivoCriatura==null&&!this.puedeDispararLibremente();
    }
    activarObjetivoLibre(){
        this.objetivoLibre = true;
        this.objetivoCriatura = null;
    }
    activarReposo(){
        this.objetivoCriatura =null;
        this.objetivoLibre = false;
    }
    activarEspejoImagen(b){
        if(b){
            this.imagenActual = this.imagenRev;
                this.desX = -this.desXori;
        }else{
            this.imagenActual = this.imagenOri;
            this.desX = this.desXori;
        }
    }
    direccionarCriatura(){
        this.criatura.direccionImagen = this.anguloArma>90&&this.anguloArma<270?6:2;
    }
}


class Laser{
    x;
    y;
    static imagen;
    angulo = 0;
    colision;
    objetivo;
    hurt = 20;
    velocidad=20;
    // point;
    idCreacion;
    desXanterior;
    desYanterior;
    constructor(x,y,objetivo){
      this.x = x;
      this.y = y;
      cargarImagen("recursos/laserRojo.png").then((imagen)=>{
        Laser.imagen = imagen;
      });
      this.objetivo = objetivo;
  
      let dx = this.objetivo.getX()-this.x;
      let dy = this.objetivo.getY()-this.y;
      
      let modulo = Math.sqrt(dx*dx+dy*dy);
      if(modulo===0) return;
      let mx = dx*27/modulo;
      let my = dy*27/modulo;
      this.angulo = calcularAnguloPantallaC(0,0,mx,my);
      this.colision = new Rectangulo(x,y,1,1);
      // this.point = {x:JUGADOR.vectMov.x,y:JUGADOR.vectMov.y};
      this.idCreacion = Mapa.generarIdCreacion();
    }
  
    actualizar(){
        if(this.fueraDeMapa()) return;
        this.actualizarPosicion();
    }
    actualizarPosicion(){
      let dx = this.objetivo.getX()-this.x;
      let dy = this.objetivo.getY()-this.y;
      let modulo = Math.sqrt(dx*dx+dy*dy);
      let mx,my;
      if(modulo===0) return;
      if(this.objetivo.getEstadoActual().getNombre()=="muerte"){
        mx = this.desXanterior;
        my = this.desYanterior;

      }else{
        mx = dx*this.velocidad/modulo;
        my = dy*this.velocidad/modulo;
        this.angulo = calcularAnguloPantallaC(0,0,mx,my);
        this.desXanterior = mx;
        this.desYanterior = my;
      }
      while(mx!=0||my!=0){
          dx = Math.abs(mx)>=10?10*Math.sign(mx):mx;
          dy = Math.abs(my)>=10?10*Math.sign(my):my;
          this.x+=dx;
          this.y+=dy;
          this.colision.x = this.x;
          this.colision.y = this.y;
          mx-=dx;
          my-=dy;
          
          if(this.verificarColision()) break;
      }
    //   this.x+=mx;
    //   this.y+=my;
      
    }
    verificarColision(){
        for(let e of MAPA.enemigos){
            if(e.getColision().intersecta(this.colision)){
                e.aumentarVida(-this.hurt);
                MAPA.quitarProyectil(this);
                return true;
            }
        }

        if(MAPA.colisiona(this.colision)){
            MAPA.quitarProyectil(this);
            return true;
        }        
        return false;
    }
    fueraDeMapa(){
      return this.x>MAPA.getAncho()||this.y>MAPA.getAlto();
    }
    getYorden(){
        return this.y;
    }
    dibujar(graficos){
      if(this.fueraDeMapa())return ;
      if(Laser.imagen!=null){
        let posX = parseInt(this.x);
        let posY = parseInt(this.y);
        dibujarImagenCentrada(Laser.imagen,posX,posY,this.angulo,graficos);
        this.colision.dibujar(graficos,"blue");
        // rotateAndPaintImage(graficos,this.imagen,this.angulo,posX,posY,ajusteX*2,ajusteY*2);
        // graficos.drawImage(this.imagen,posX,posY);
      }
    }
    getIdCreacion(){
        return this.idCreacion;
    }
  }