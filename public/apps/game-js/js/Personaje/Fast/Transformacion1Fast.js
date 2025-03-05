class Transformacion1Fast extends Transformacion{
    constructor(fast){
        super(1,0,fast);
        this.addEstadoQuietoOBL(getAnimacion("fast_t1_basico_moviendose"));
        let condicion =  this.movimientoInactivo = () => fast.mb.posibleMovimiento();
        this.addEstadoMoviendoseOBL(getAnimacion("fast_t1_basico_moviendose"),condicion,3);
    }
}