class Dependiente extends Criatura{
	mb = new MecanismoMovimiento( this);
	caminoHuida = [];
	constructor(anchoCuadroColision, altoCuadroColision, id) {
		super(anchoCuadroColision, altoCuadroColision, id);
		// this.mb.addEventListener("preCambioDestino",()=>{
		// 	let bDependiente = this.getBacteria();
		// 	let dirMov = MAPA.cruzBacteria.getDirMovAjuste(bDependiente);
		// 	if(dirMov===-1) return;

		// 	let camino = this.mb.crearCaminoBacteria(bDependiente,1,dirMov);
		// 	this.mb.recorrerCaminoBacteria(camino);
		// });

		this.mb.addEventListener("preCambioDestino",()=>{
			// for(let e of MAPA.enemigos){
			// 	if(e!=this&&e.id === this.id && e.getVelocidadActual()===this.getVelocidadActual()){
			// 		this.setReduccionVelocidad(random(10,60));
			// 	}
			// }
		});
		
	}
	estaQuieto(){
		return this.mb.estaQuieto();
	}
	configurarPosicion(posX,posY){
		this.setPosMapa(posX,posY);
		this.mb.configurarBacteriaDestino();
	}
	esBacteriaAlineada(bacteria){
		if(bacteria==null) return false;
		for(let numV_Jugador of JUGADOR.numerosV){
			if(numV_Jugador === bacteria.numeroV){
			  return true;
			}
		}
		return false;
	}	
	
	getVectorDirMov(){
		return this.mb.vectDirMov;
	}
	actualizarMov() {
		
		this.mb.actualizar();
		
	}
	dibujar(graficos) {
		super.dibujar(graficos);
	}
	getBacteria() {
		if(this.mb.getBacteriaDestino()!=null) {
			return this.mb.getBacteriaDestino();
		}
		return super.getBacteria();
	}
    setSolicitudesDeMov(direccion, distanciaTile) {
		this.mb.recorrerCaminoBacteria( this.mb.crearCaminoBacteria(this.getBacteria(), distanciaTile, this.getDireccion()) );

	}
	solicitudMovCompletada() {
		return !this.mb.solicitudRecorrer;
	}

	estaHuyendo() {
		return this.mb.getBuscadorRuta().alejarse;
	}
	
}
