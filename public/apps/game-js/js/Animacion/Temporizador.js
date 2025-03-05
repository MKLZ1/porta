class Temporizador {
	tiempoMaximo;
	contador;
	idGlobal;
	id;
	nombre;
	constructor(tiempoMaximo = 0) {
		this.tiempoMaximo = tiempoMaximo;
		this.contador = 0;
	}
	setNombre(nombre){
		this.nombre = nombre;
	}
	setTiempoMaximo(tiempoMaximo) {
		this.tiempoMaximo = tiempoMaximo;
	}
	estaConfigurado() {
		return this.tiempoMaximo>0;
	}
	actualizar() {

		if(!this.tiempoCumplido())
        this.contador++;
	}
	
	reiniciar() {
		this.contador = 0;
	}
	
	tiempoCumplido() {
		return this.contador>=this.tiempoMaximo;
	}
	getContador() {
		return this.contador;
	}
	getTiempoMaximo() {
		return this.tiempoMaximo;
	}
	getTiempoFaltante() {
		return this.tiempoMaximo-contador;
	}
	setContador(contador){
		this.contador = contador;
	}
}