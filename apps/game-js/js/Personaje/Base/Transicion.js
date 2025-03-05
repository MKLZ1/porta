class Transicion{
    tmpDuracion = new Temporizador();
    transformacionOrigen;
    transformacionDestino;
    animador;
    cdActivacion;
    imagenActual;
    criatura;
    constructor(transformacionOrigen,transformacionDestino,animador,cdActivacion,duracion){
        this.transformacionOrigen = transformacionOrigen;
        this.transformacionDestino = transformacionDestino;
        this.animador = animador;
        this.cdActivacion = cdActivacion;
        this.tmpDuracion.setTiempoMaximo(duracion);
        this.criatura = transformacionOrigen.criatura;
    }
    getTransformacionDestino(){
        return this.transformacionDestino;
    }
    actualizarImagenActual(){
        this.imagenActual = this.animador.getImagen(this.criatura.direccionImagen);
    }
    getImagenActual(){
        return this.imagenActual;
    }
    accionInicial(){
        this.animador.reiniciarAnimacion();
        this.tmpDuracion.reiniciar();
    }
    actualizar(){
        this.tmpDuracion.actualizar();
        this.actualizarImagenActual();
    }

    cumpleCondicionActivacion(){
        return this.cdActivacion();
    }
    tiempoCumplido(){
        return this.tmpDuracion.tiempoCumplido();
    }
    
}