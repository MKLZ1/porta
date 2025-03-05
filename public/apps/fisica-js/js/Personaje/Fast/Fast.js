class Fast extends Dependiente{
    constructor(){
        super(28,16,1);
        this.addTransformacion(new Transformacion1Fast(this));
        this.setAjustePYimagen(-50)
    }
}