class GestorObjetosDibujo{
    aliados;
    enemigos;
    objetosMapa;
    objetosDibujo = [];
    size;
    constructor(jugador,aliados,enemigos,objetosMapa){
        this.jugador = jugador;
        this.aliados = aliados;
        this.enemigos = enemigos;
        this.objetosMapa = objetosMapa;
        this.objetosDibujo.push(jugador);
        // this.objetosDibujo.push(...aliados);
        this.objetosDibujo.push(...enemigos);
    }

    dibujar(graficos){
        for(let od of this.objetosDibujo){
            od.dibujar(graficos);
        }
        jugador.dibujar(graficos);
        for(let a of this.aliados){
            a.dibujar(graficos);
        }
        for(let om of this.objetosMapa){
            om.dibujar(graficos);
        }
        for(let e of this.enemigos){
            e.dibujar(graficos);
        }
    }

    ordenarObjetosDibujo() {
        for (let i = 0; i < this.objetosDibujo.length; i++) {
          let posMenor = i;
          for (let j = i + 1; j < this.objetosDibujo.length; j++) {
            if (
              this.objetosDibujo[posMenor].getYorden() >
              this.objetosDibujo[j].getYorden()
            ) {
              posMenor = j;
            }
          }
          let auxiliar = this.objetosDibujo[i];
          this.objetosDibujo[i] = this.objetosDibujo[posMenor];
          this.objetosDibujo[posMenor] = auxiliar;
        }
      }
}