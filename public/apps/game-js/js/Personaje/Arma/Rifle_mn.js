class Rifle_mn {
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
  temporizador = new Temporizador(7);
  listaLaser = [];
  vectDesBalaInicio = new Point();
  constructor(criatura, desX, desY, cdDisparo) {
    this.criatura = criatura;
    this.desX = this.desXori = desX;
    this.desY = this.desYori = desY;
    this.cdDisparo = cdDisparo;
    cargarImagen("recursos/rifle_mn.png").then((imagen) => {
      this.imagenOri = imagen;
      let canvas = document.createElement("canvas");
      canvas.width = this.imagenOri.width;
      canvas.height = this.imagenOri.height;

      let contexto = canvas.getContext("2d", { willReadFrequently: true });
      contexto.translate(0, this.imagenOri.height);
      contexto.scale(1, -1);
      contexto.drawImage(this.imagenOri, 0, 0);
      this.imagenRev = canvas;
    });
  }
  activarObjetivoCriatura(oc) {
    this.objetivoCriatura = oc;
    this.objetivoLibre = false;
  }
  activarObjetivoLibre() {
    this.objetivoLibre = true;
    this.objetivoCriatura = null;
  }
  activarReposo() {
    this.objetivoCriatura = null;
    this.objetivoLibre = false;
  }
  actualizar() {
    this.temporizador.actualizar();
    for (let l of this.listaLaser) {
      l.actualizar();
    }
    if (this.objetivoCriatura != null) {
      let dx = this.objetivoCriatura.getX() - this.criatura.getX();
      let dy = this.objetivoCriatura.getY() - this.criatura.getY();
      this.anguloArma = calcularAnguloPantallaC(0, 0, dx, dy);
      if (this.anguloArma >= 270 || this.anguloArma <= 90) {
        this.imagenActual = this.imagenOri;
        this.desX = this.desXori;
      } else {
        this.imagenActual = this.imagenRev;
        this.desX = -this.desXori;
      }
      this.cambiarDireccionImagenCriatura();
    } else if (this.objetivoLibre) {
      switch (this.criatura.direccionImagen) {
        case 2:
          this.imagenActual = this.imagenOri;
          this.desX = this.desXori;
          break;
        case 6:
          this.imagenActual = this.imagenRev;
          this.desX = -this.desXori;
          break;
      }
      this.anguloArma = Direccion.convertIntToAngle(
        this.criatura.getDireccion()
      );
    } else {
      switch (this.criatura.direccionImagen) {
        case 2:
          this.imagenActual = this.imagenOri;
          this.desX = this.desXori;
          break;
        case 6:
          this.imagenActual = this.imagenRev;
          this.desX = -this.desXori;
          break;
      }
      this.anguloArma = Direccion.convertIntToAngle(
        this.criatura.direccionImagen
      );
    }
    if (this.cdDisparo() && this.temporizador.tiempoCumplido()) {
      this.vectDesBalaInicio.x = Math.cos(toRadians(this.anguloArma)) * 65;
      this.vectDesBalaInicio.y = -Math.sin(toRadians(this.anguloArma)) * 65;

      this.listaLaser.push(
        new Laser(
          JUGADOR.getX() + this.vectDesBalaInicio.x,
          JUGADOR.getY() + this.desY + this.vectDesBalaInicio.y,
          this.objetivoCriatura
        )
      );
      this.temporizador.setTiempoMaximo(random(4, 10));
      this.temporizador.reiniciar();
      let snd = new Audio("recursos/disparo2.wav");
      snd.play();
    }
    let l;
    for (let i = 0; i < this.listaLaser.length; i++) {
      l = this.listaLaser[i];
      let salir = false;
      for (let e of MAPA.enemigos) {
        for (let c of MAPA.matrizColisiones) {
          if (c != null && c.intersecta(l.colision)) {
            removeItemFromArr(this.listaLaser, l);
            i--;
            e.aumentarVida(-20);
            salir = true;
            break;
          }
        }
        if (salir) break;
        if (e.getColision().intersecta(l.colision)) {
          removeItemFromArr(this.listaLaser, l);
          i--;
          e.aumentarVida(-20);
          break;
        }
      }
    }
  }
  cambiarDireccionImagenCriatura() {
    if (this.anguloArma >= 270 || this.anguloArma <= 90) {
      this.criatura.direccionImagen = 2;
    } else {
      this.criatura.direccionImagen = 6;
    }
  }
  dibujar(graficos) {
    if (this.imagenOri == null) return;
    for (let l of this.listaLaser) {
      l.dibujar(graficos);
    }
    dibujarImagenCentrada(
      this.imagenActual,
      parseInt(this.criatura.getX() + this.desX),
      parseInt(this.criatura.getY() + this.desY),
      this.anguloArma,
      graficos
    );
  }
}
