var objetoMostrar = [];
class CamaraMapa {
  mapa;
  cvPreImagenFinal;
  preGraficos;
  cvImagenMapa;
  registroMovCamara;
  registroMovCentral;
  generadorSombra;
  objetosDibujo;
  puntosEsquina;
  radio = 400;
  colorSombra = "#000b";
  // listaLaser = [];
  // temporizador = new Temporizador(7);
  constructor(
    registroMovCentral,
    imagenMapa,
    objetosDibujo,
    puntosEsquina,
    anchoMapa,
    altoMapa
  ) {
    this.cvPreImagenFinal = document.createElement("canvas");
    this.cvPreImagenFinal.width = canvas.width;
    this.cvPreImagenFinal.height = canvas.height;
    this.preGraficos = this.cvPreImagenFinal.getContext("2d", { alpha: false });
    this.imagenMapa = imagenMapa;
    this.registroMovCamara = new Point();
    this.registroMovCentral = registroMovCentral;
    // this.generadorSombra = mapa.getGeneradorSombra();
    this.objetosDibujo = objetosDibujo;
    this.puntosEsquina = puntosEsquina;
    this.anchoMapa = anchoMapa;
    this.altoMapa = altoMapa;
    //=============================================
    this.rectangulo = new Rectangulo(0, 0, 10, 10);

    // this.generadorSombra.crearRayosEsquina(this.mapaBacteria.puntosEsquina);
  }
  setGeneradorSombra(generadorSombra) {
    this.generadorSombra = generadorSombra;
  }
  actualizar() {
    this.actualizarRegistroMovCamara();
    // if (!isMobile()) this.generadorSombra.actualizar();
    this.ordenarObjetosDibujo();
  }

  recortarGraficosCirculo(graficos) {
    graficos.beginPath();
    graficos.arc(
      this.registroMovCentral.getX(),
      this.registroMovCentral.getY(),
      this.radio,
      0,
      2 * Math.PI
    );
    graficos.clip();
  }
  rellenarGraficosCirculo(graficos) {
    // Radii of the white glow.
    let innerRadius = 5,
      outerRadius = 100;
    let posX = this.registroMovCentral.getX();
    let posY = this.registroMovCentral.getY();
    // Radius of the entire circle.
    let gradient = graficos.createRadialGradient(
      this.traducirX(posX),
      this.traducirY(posY),
      0,
      this.traducirX(posX),
      this.traducirY(posY),
      this.radio
    );
    gradient.addColorStop(0, "#0002");
    gradient.addColorStop(1, this.colorSombra);
    graficos.beginPath();
    graficos.arc(
      this.traducirX(posX),
      this.traducirY(posY),
      this.radio,
      0,
      2 * Math.PI
    );

    graficos.fillStyle = gradient;
    graficos.fill();
  }
  dibujar(graficos) {
    // addBullet(200,200,BULLET_TYPES.red);
    // updateDrawAllBullets(graficos);
    this.dibujarPreImagenFinal();
    graficos.drawImage(this.cvPreImagenFinal, 0, 0);
    this.dibujarCuadroSombra(graficos);
    graficos.save();
    graficos.translate(this.getXdes(), this.getYdes());
    // this.mapa.cruzBacteria.dibujar(graficos);

    // let totalCriaturas = 0;
    // objetoMostrar[1] = JUGADOR.getBacteria().numeroV.criaturas.length;
    // totalCriaturas+=objetoMostrar[1];
    // for(let b of JUGADOR.getBacteria().numeroV.bacterias){
    //   // b.dibujar(graficos);
    // }

    // let vecinoDerecha = JUGADOR.getBacteria().getVecino(2);
    // if(vecinoDerecha!=null){
    //   objetoMostrar[2] = vecinoDerecha.numeroV.criaturas.length;
    //   totalCriaturas+=objetoMostrar[2];

    //   for(let b of vecinoDerecha.numeroV.bacterias){
    //     // b.dibujar(graficos);
    //   }
    // }

    // let vecinoIzquierda = JUGADOR.getBacteria().getVecino(6);
    // if(vecinoIzquierda!=null){
    //   objetoMostrar[0] = vecinoIzquierda.numeroV.criaturas.length;
    //   totalCriaturas+=objetoMostrar[0];

    //   for(let b of vecinoIzquierda.numeroV.bacterias){
    //     // b.dibujar(graficos);
    //   }
    // }
    // JUGADOR.getBacteria().lineaBacteriaV.dibujar(graficos);
    // JUGADOR.getBacteria().lineaBacteriaH.dibujar(graficos);
    // MAPA.gLineaBacteriaV.dibujar(graficos);
    // MAPA.gLineaBacteriaH.dibujar(graficos);

    // console.log(JUGADOR.getBacteria().numeroV.bacterias.length);
    // this.mapa.mapaBacteria.dibujarColoniaBacteria(graficos);
    //  this.mapa.mapaBacteria.mapaTetris.dibujar(graficos);
    if (!isMobile()) {
      this.recortarGraficosCirculo(graficos);
    } else {
      //this.recortarGraficosCirculo(graficos);
      this.generadorSombra.recortarGraficos(graficos);
    }
    //========================================================

    //======================================================
    /*let posXmapaC = -this.getXdes;
    let linea = new Linea();
    for (let pev of this.puntosEsquinaValidos) {
      linea.setLineaP(this.registroMovCentral, pev.puntoDestino);
      linea.dibujar(graficos);
    }
    let posYmapaC = -this.getYdes;
    let posX = parseInt(posXmapaC / 32) * 32;
    let posY = parseInt(posYmapaC / 32) * 32;
    let vector = { x: 1, y: 0 };
    let nextPosX;
    let nextPosY;
    let contadorGiros = 0;
    while (contadorGiros < 4) {
      this.cuadroPrueba.setLocation(posX, posY);
      if (this.mapa.colisiona(this.cuadroPrueba)) {
        this.cuadroPrueba.dibujar(graficos, "red");
      } else {
        this.cuadroPrueba.dibujar(graficos, "green");
      }
      nextPosX = posX + vector.x * 32;
      nextPosY = posY + vector.y * 32;

      let condicionX =
        nextPosX < parseInt(posXmapaC / 32) * 32 ||
        nextPosX > -this.getXdes + canvas.width - 1;
      let condicionY =
        nextPosY < parseInt(posYmapaC / 32) * 32 ||
        nextPosY > -this.getYdes + canvas.height - 1;

      if (condicionX) {
        this.girar90grados(vector);
        contadorGiros++;
      } else if (condicionY) {
        this.girar90grados(vector);
        contadorGiros++;
      }
      posX += vector.x * 32;
      posY += vector.y * 32;
    
    }
    */
    //========================================================
    //JUGADOR.capaParasito.dibujarPesos(graficos);
    //this.mapa.mapaBacteria.mapaTetris.dibujar(graficos);
    //========================================================
    //this.rectangulo.setLocation(this.mapa.koro.registroMov.getX(),this.mapa.koro.registroMov.getY());
    //this.rectangulo.dibujar(graficos,"magenta");
    graficos.resetTransform();
    graficos.drawImage(this.cvPreImagenFinal, 0, 0);
    //this.rellenarGraficosCirculo(graficos);
    graficos.restore();
  }
  repartirCriaturas(numCriaturas) {
    numCriaturas / 3;
  }
  dibujarPreImagenFinal() {
    this.preGraficos.drawImage(
      this.imagenMapa,
      -this.getXdes(),
      -this.getYdes(),
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    this.preGraficos.translate(this.getXdes(), this.getYdes());

    for (let od of this.objetosDibujo) {
      od.dibujar(this.preGraficos);
    }
    // for (let c of this.mapa.getColisionesTile()) {
    //   c.dibujarContorno(this.preGraficos, "red");
    // }
    // for(let l of this.listaLaser){
    //   l.dibujar(this.preGraficos);
    // }
    this.preGraficos.resetTransform();
  }
  dibujarCuadroSombra(graficos) {
    //graficos.fillStyle = "#0007";
    graficos.fillStyle = this.colorSombra;

    graficos.fillRect(0, 0, canvas.width, canvas.height);
  }
  traducirX(posX) {
    return posX + this.getXdes();
  }
  traducirY(posY) {
    return posY + this.getYdes();
  }
  getXdes() {
    return this.registroMovCamara.getX();
  }
  getYdes() {
    return this.registroMovCamara.getY();
  }
  actualizarRegistroMovCamara() {
    this.movXinicial = canvas.width / 2;
    this.movYinicial = canvas.height / 2;
    let posX = this.movXinicial - this.registroMovCentral.getX();
    let posY = this.movYinicial - this.registroMovCentral.getY();
    if (posX > 0) {
      posX = 0;
    }
    if (posX < canvas.width - this.anchoMapa) {
      posX = canvas.width - this.anchoMapa;
    }
    if (posY > 0) {
      posY = 0;
    }
    if (posY < canvas.height - this.altoMapa) {
      posY = canvas.height - this.altoMapa;
    }
    this.registroMovCamara.setLocation(parseInt(posX), parseInt(posY));
  }
  ordenarObjetosDibujo() {
    let objMenor, objActual;
    for (let i = 0; i < this.objetosDibujo.length; i++) {
      let posMenor = i;
      for (let j = i + 1; j < this.objetosDibujo.length; j++) {
        objMenor = this.objetosDibujo[posMenor];
        objActual = this.objetosDibujo[j];
        if (
          objMenor.getYorden() == objActual.getYorden() &&
          objMenor.getIdCreacion() > objActual.getIdCreacion()
        ) {
          posMenor = j;
        } else if (objMenor.getYorden() > objActual.getYorden()) {
          posMenor = j;
        }
      }
      let auxiliar = this.objetosDibujo[i];
      this.objetosDibujo[i] = this.objetosDibujo[posMenor];
      this.objetosDibujo[posMenor] = auxiliar;
    }
  }
}
