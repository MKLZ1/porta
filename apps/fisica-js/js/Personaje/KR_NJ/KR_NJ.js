class KR_NJ extends Dependiente {
  condiciones;
  decidioMoverse;

  constructor() {
    super(28, 16, 1);
    this.condiciones = new CondicionesKoroNJ(this);
    this.addTransformacion( new Transformacion1KR(this, 30, this.condiciones));
    this.addTransformacion( new Transformacion2KR(this, 30, this.condiciones))
   
    let cdActivacion1 = ()=>this.vidaActual<=50&&this.vidaActual>25;
    let transicion1 = new Transicion(this.getTrans(1),this.getTrans(2),getAnimacion("KR_T1_T2"),cdActivacion1,13);
    this.getTrans(1).addTransicion(transicion1);

    let cdActivacion2 = ()=>this.vidaActual<=25;
    let transicion2 = new Transicion(this.getTrans(2),this.getTrans(1),getAnimacion("KR_T2_T1"),cdActivacion2,13);
    this.getTrans(2).addTransicion(transicion2);

    this.configurarTransformaciones();
    this.setAjustePYimagen(-18);  }

  configurarTransformaciones() {}

  //=============================================================================================================================

}
