class Horo extends Dependiente{

    constructor(){
        // super(400,100,4);
        super(32,32,4);

        this.addTransformacion(new Tranformacion1Horo(this));
        this.setAjustePYimagen(-140);
    }
}

class Tranformacion1Horo extends Transformacion{
    constructor(horo){
        super(1,0,horo);
        this.addEstadoQuietoOBL(getAnimacion("horo_durmiendo"));
        this.addEstadoMoviendoseOBL(getAnimacion("horo_durmiendo"),3);
        // this.getEstado("moviendose").setVelocidad(0);
    }
}