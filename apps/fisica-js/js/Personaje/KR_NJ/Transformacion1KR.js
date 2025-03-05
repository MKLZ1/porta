class Transformacion1KR extends Transformacion {
  constructor(kr, tiempoDescanso, condiciones) {
    super(1, tiempoDescanso, kr);

    this.addEstadoQuietoOBL(getAnimacion("KR_transformacion1_quieto"));
    this.addEstadoMoviendoseOBL(getAnimacion("KR_transformacion1_moviendose"),3);
    this.addEstado(new EstadoAcelerar(kr));

    this.addEstadoMuerte(getAnimacion("KR_T1_muerte"),60);
    this.addEstado(new EstadoEscape(kr, condiciones.huir));
    this.addEstado(new EstadoEmbestida(kr));
    
    //HACE FALTA ALGO PARA PODER CONFIGURAR UN TIEMPO MINIMO QUE TIENE QUE DURAR UN ESTADO,
    //UNA VEZ IMPLEMENTADO, SE PUEDE MODIFICAR EL ESTADO ACELERAR Y EL ESTADO NORMAL, AUNQUE AHORA
    //QUE LO PIENSO, IGUAL NO ARREGLA NADA :v, QUE SEA MEJOR QUE SE CONFIGURE UN BLOQUEO CON TIEMPO,
    //MINIMO SIEMPRE Y CUANDO SE MUEVA, SI NO SE MUEVE TODO SE CANCELA
  }
}


class EstadoEscape extends EstadoJugador {
  temporizador = new Temporizador(60);
  constructor(kr, condicion) {
    super("escape", "defensa", kr, condicion, 0);
    this.addAnimador(getAnimacion("KR_T2_MOV"));
    this.setVelocidad(6);
    this.desbloquearCuando(()=>!this.criatura.mb.posibleMovimiento());
    this.setPermitirTransicion(true);
  }
  inicio() {
    this.criatura.mb.getBuscadorRuta().alejarse = true;
    this.setTiempoMinimo(random(30, 75));
  }
  eventoDesbloqueo(){
    this.criatura.mb.getBuscadorRuta().alejarse = false;
   
  }      
  // interrumpeBloqueo(){
  //   this.criatura.mb.getBuscadorRuta().alejarse = false;
  // }
    
}
class EstadoEmbestida extends EstadoJugador {
  areaAtaque;
  distanciaT;

  constructor(kr) {
    super("embestida", "ataque", kr, null, 120);

    this.areaAtaque = new RectanguloHelice(kr, 32 * 2, 12 * 32);
    this.cdActivacion = () => {
      return this.areaAtaque.intersecta(kr.objetivo.getColision());
    };

    this.addAnimador(getAnimacion("KR_T3"));
    this.setVelocidad(10);
    this.bloquearAlIniciar(true);
    this.desbloquearCuando(()=>!this.criatura.mb.solicitudRecorrer);
  }

  inicio() {
    this.criatura.mb.recorrerCaminoBacteria(
      MAPA.mapaBacteria.crearCaminoBacteria(
        this.criatura.getBacteria(),
        14,
        this.criatura.getDireccion()
      )
    );
    let snd = new Audio("recursos/rugido2.wav"); ;
    // snd.play();
  }
  eventoDesbloqueo(){
    this.dejarEstado();
  }
  interrumpeBloqueo(){
    this.criatura.mb.cancelarRecorrerCamino();
  }
  dibujar(posX, posY, graficos) {
    super.dibujar(posX, posY, graficos);
    this.areaAtaque.dibujar(graficos);
  }
}

class EstadoAcelerar extends EstadoJugador {
  // temporizador = new Temporizador(50);
  constructor(kr) {
    super("acelerar", "basico", kr, null, 35);
    this.cdActivacion = () => this.semiDistanciaObjetivo() > 2 ** 2;
    this.setVelocidad(4);
    this.addAnimador(getAnimacion("KR_T2_MOV"));
    this.setTiempoMinimo(50);
    this.desbloquearCuando(()=>this.criatura.getBacteria()===this.criatura.objetivo.getBacteria());
    this.setPermitirTransicion(true);
  }
  semiDistanciaObjetivo() {
    let bObjetivo = this.criatura.objetivo.getBacteria();
    let bCriatura = this.criatura.getBacteria();
    let dx = bObjetivo.getXtile() - bCriatura.getXtile();
    let dy = bObjetivo.getYtile() - bCriatura.getYtile();

    return dx * dx + dy * dy;
  }
}


