class Fisica {
  static E = 0.7;
  cuerpos = [];
  static Jugador = null;
  constructor() {
    this.cuerpos.push(FsPoligono.createBox(300, 300, 50, 50, 1000));
    // this.cuerpos.push(FsPoligono.createBox(600, 600, 50, 50, 1000));
    // this.cuerpos.push(FsPoligono.createBox(600, 500, 50, 50, 1000));
    // this.cuerpos.push(FsPoligono.createBox(600, 400, 50, 50, 1000));
    // this.cuerpos.push(FsPoligono.createBox(600, 300, 50, 50, 1000));

    this.cuerpos.push(FsPoligono.createBox(0, 600, 10, 1200, 10, true));
    this.cuerpos.push(FsPoligono.createBox(600, 0, 1200, 10, 10, true));
    this.cuerpos.push(FsPoligono.createBox(1120, 600, 10, 1200, 10, true));
    this.cuerpos.push(FsPoligono.createBox(600, 765, 1200, 20, 10, true));
    canvas.addEventListener("click", () => {
      let x = getMousePosition().x;
      let y = getMousePosition().y;
      this.cuerpos.push(FsPoligono.createBox(x, y, 200, 20, 1000));
      // console.log(this.cuerpos.length);
    });
    // this.cuerpos.push(FsPoligono.createBox(210,210,100,100,10));
    // this.cuerpos.push(FsPoligono.createBox(310,310,100,100,10));
    // this.cuerpos.push(FsPoligono.createBox(800,220,100,100,10));

    // this.cuerpos.push(FsPoligono.createCircle(500,500,3,70));
    // this.cuerpos.push(FsPoligono.createCircle(500,200,10,100,true));
    // this.cuerpos.push(FsPoligono.createCircle(500,500,10,100,true));

    // this.cuerpos.push(FsPoligono.createBox(500,200,200,2,true));

    // this.cuerpos.push(new FsCirculo(500,500,100));
  }

  actualizar() {
    this.actualizarMovPrimerCuerpo();
    let dt = 1 / FPS;
    let numPasos = 1;
    for (let k = 0; k < numPasos; k++) {
      let dt2 = dt / numPasos;
      for (let c of this.cuerpos) {
        c.actualizar(dt2);
      }
      for (let i = 0; i < this.cuerpos.length; i++) {
        for (let j = i + 1; j < this.cuerpos.length; j++) {
          let c1 = this.cuerpos[i];
          let c2 = this.cuerpos[j];
          if (!c1.hayColisionSimple(c2)) {
            continue;
          }

          FsMath.procesarCuerpos(c1, c2);
        }
      }
    }
  }

  dibujar(graficos) {
    for (let c of this.cuerpos) {
      c.dibujar(graficos);

      let r = new Rectangulo(c.posicion.x - 2, c.posicion.y - 2, 4, 4);
      r.dibujar(graficos, "blue");
    }
    for (let c of this.cuerpos) {
      for (let v of c.vsGlobales) {
        if (v.estado == "activo") {
          let ancho = 10;
          let alto = 10;
          let cuadro = new Rectangulo(
            v.x - ancho / 2,
            v.y - alto / 2,
            ancho,
            alto
          );
          cuadro.dibujar(graficos, "blue");
        }
      }
    }
  }
  actualizarMovPrimerCuerpo() {
    let c = this.cuerpos[0];
    if (teclaPresionada("j")) {
      c.setVelocidad(0, 0);
    }
    let v = 300;
    if (teclaPresionada("a")) {
      c.setVelocidadX(-v);
      // c.mover(-v,0);
    } else if (teclaPresionada("d")) {
      c.setVelocidadX(v);
      // c.mover(v,0);
    }
    if (teclaPresionada("w")) {
      // c.mover(0,-v);
      c.setVelocidadY(-v);
    } else if (teclaPresionada("s")) {
      c.setVelocidadY(v);
      // c.mover(0,v);
    }

    if (teclaPresionada("k")) {
      c.rotar(4);
    } else if (teclaPresionada("l")) {
      c.rotar(-4);
    }

    if (teclaPresionada("n")) {
      c.velocidadAngular = 180;
    } else if (teclaPresionada("m")) {
      c.velocidadAngular = -180;
    }

    if (teclaPresionada("p")) {
      c.rotar(90);
    }
  }
}

class Fsbody {
  posicion;
  velocidad;
  velocidadAngular;
  angulo;
  fuerza;
  masa;
  esEstatico;
  masaInv;
  densidad;
  momentoInercia;
  constructor(x, y, masa, esEstatico = false) {
    this.posicion = new FsVector(x, y);
    this.velocidad = new FsVector();
    this.fuerza = new FsVector();
    this.rotacion = 0;
    this.masa = masa;
    this.masaInv = 1 / this.masa;
    this.esEstatico = esEstatico;
    this.velocidadAngular = 0;
    this.angulo = 0;
  }
  calcularMomentoX() {
    return this.velocidad.x * this.masa;
  }
  calcularMomentoY() {
    return this.velocidad.y * this.masa;
  }
  actualizar(dt) {
    if (this.esEstatico) return;
    // this.velocidad.y+=613.6*dt;
    let movX = this.velocidad.x * dt;
    let movY = this.velocidad.y * dt;
    let aumentoAngulo = this.velocidadAngular * dt;
    this.mover(movX, movY);
    this.rotar(aumentoAngulo);
  }
  mover(movX, movY) {
    this.posicion.x += movX;
    this.posicion.y += movY;
  }
  rotar(angulo) {
    this.angulo += angulo;
    // this.arreglarAngulo();
  }
  arreglarAngulo() {
    if (this.angulo >= 2 * Math.PI) {
      this.angulo -= 2 * Math.PI;
    } else if (this.angulo < 0) {
      this.angulo += 2 * Math.PI;
    }
  }
  setVelocidad(x, y) {
    this.velocidad.x = x;
    this.velocidad.y = y;
  }
  setVelocidadX(x) {
    this.velocidad.x = x;
  }
  setVelocidadY(y) {
    this.velocidad.y = y;
  }

  getVelocidad(eje) {
    return this.velocidad[eje.toLowerCase()];
  }
}

class FsPoligono extends Fsbody {
  vsIniciales;
  vsLocales;
  vsGlobales;
  normales;
  static idGlobal = 0;
  id;
  vTemp = new FsVector();
  constructor(centroX, centroY, verticesIniciales, masa, esEstatico = false) {
    super(centroX, centroY, masa, esEstatico);
    this.id = FsPoligono.idGlobal++;
    this.vsIniciales = verticesIniciales;
    this.vsLocales = [];
    this.vsGlobales = [];
    this.normales = [];
    for (let i = 0; i < this.vsIniciales.length; i++) {
      this.vsLocales[i] = new FsVector(
        this.vsIniciales[i].x,
        this.vsIniciales[i].y
      );
      this.normales[i] = new FsVector();
      this.vsGlobales[i] = new FsVector();
    }

    this.actualizarVsGlobales();
    this.actualizarNormales();
    this.densidad = masa / FsMath.calcularArea(this.vsIniciales);
    this.momentoInercia = FsMath.calcularMomentoInercia(
      this.vsIniciales,
      this.densidad
    );
    this.momentoInerciaInv = 1 / this.momentoInercia;
    if (esEstatico) {
      this.masaInv = 0;
      this.momentoInerciaInv = 0;
    }
  }

  static createCircle(x, y, numCaras, radio, esEstatico = false) {
    let anguloDiv = 360 / numCaras;
    let verticesBase = [];
    for (let i = 0; i < numCaras; i++) {
      let v = FsVector.CreateVector(i * anguloDiv, radio);
      verticesBase.push(v);
    }
    return new FsPoligono(x, y, verticesBase, esEstatico);
  }
  static createBox(x, y, width, height, masa, esEstatico = false) {
    let left = -width / 2;
    let right = -left;
    let top = -height / 2;
    let bottom = -top;
    let verticesBase = [];

    verticesBase.push(new FsVector(left, top));
    verticesBase.push(new FsVector(right, top));
    verticesBase.push(new FsVector(right, bottom));
    verticesBase.push(new FsVector(left, bottom));

    return new FsPoligono(x, y, verticesBase, masa, esEstatico);
  }
  actualizar(dt) {
    super.actualizar(dt);
    this.actualizarVsLocales();
    this.actualizarVsGlobales();
    this.actualizarNormales();
  }
  actualizarVsLocales() {
    for (let i = 0; i < this.vsLocales.length; i++) {
      FsVector.Rotation(this.vsIniciales[i], this.angulo, this.vsLocales[i]);
    }
  }
  actualizarVsGlobales() {
    for (let i = 0; i < this.vsLocales.length; i++) {
      FsVector.Sum(this.vsLocales[i], this.posicion, this.vsGlobales[i]);
    }
  }
  actualizarNormales() {
    for (let i = 0; i < this.vsGlobales.length; i++) {
      let vA = this.vsGlobales[i];
      let vB = this.vsGlobales[(i + 1) % this.vsGlobales.length];
      let n = this.normales[i];
      FsVector.Sub(vB, vA, this.vTemp);
      n.x = this.vTemp.y;
      n.y = -this.vTemp.x;
      FsVector.normalizar(n, n);
    }
  }
  proyectar(vProyeccion) {
    return FsMath.proyectarVertices(this.vsGlobales, vProyeccion);
  }
  hayColisionSimple(c) {
    let axmin = Number.MAX_SAFE_INTEGER,
      axmax = Number.MIN_SAFE_INTEGER,
      aymin = Number.MAX_SAFE_INTEGER,
      aymax = Number.MIN_SAFE_INTEGER;
    let bxmin = Number.MAX_SAFE_INTEGER,
      bxmax = Number.MIN_SAFE_INTEGER,
      bymin = Number.MAX_SAFE_INTEGER,
      bymax = Number.MIN_SAFE_INTEGER;
    for (let v of this.vsGlobales) {
      if (v.x < axmin) {
        axmin = v.x;
      }
      if (v.y < aymin) {
        aymin = v.y;
      }
      if (v.x > axmax) {
        axmax = v.x;
      }
      if (v.y > aymax) {
        aymax = v.y;
      }
    }
    for (let v of c.vsGlobales) {
      if (v.x < bxmin) {
        bxmin = v.x;
      }
      if (v.y < bymin) {
        bymin = v.y;
      }
      if (v.x > bxmax) {
        bxmax = v.x;
      }
      if (v.y > bymax) {
        bymax = v.y;
      }
    }

    return !(
      axmax <= bxmin ||
      bxmax <= axmin ||
      aymax <= bymin ||
      bymax <= aymin
    );
  }
  dibujar(graficos, color = "red") {
    graficos.fillStyle = color;
    graficos.strokeStyle = "white";
    graficos.beginPath();
    graficos.moveTo(
      parseInt(this.vsGlobales[0].x),
      parseInt(this.vsGlobales[0].y)
    );
    for (let i = 1; i < this.vsGlobales.length; i++) {
      graficos.lineTo(
        parseInt(this.vsGlobales[i].x),
        parseInt(this.vsGlobales[i].y)
      );
    }
    graficos.closePath();

    graficos.fill();
    graficos.stroke();
  }
  colisionPoligono(poligono) {
    let normales = [...this.normales, ...poligono.normales];
    return FsMath.calcularColision(this, poligono, normales);
  }

  colisionCirculo(circulo) {
    let normalCirculo = null;
    let moduloMenor = Number.MAX_SAFE_INTEGER;
    for (let v of this.vertices) {
      let normal = FsVector.Sub(circulo.posicion, v);

      let semiModulo = FsVector.SemiModulo(normal);
      if (semiModulo < moduloMenor) {
        moduloMenor = semiModulo;
        normalCirculo = normal;
      }
    }
    FsVector.TransformUnit(normalCirculo);
    let normales = [];
    normales.push(...this.normales);
    normales.push(normalCirculo);
    return FsMath.InterseccionMenor(this, circulo, normales);
  }
}
class FsCirculo extends Fsbody {
  radio;
  constructor(centroX, centroY, radio) {
    super(centroX, centroY);
    this.radio = radio;
  }
  actualizar() {
    super.actualizar();
  }
  dibujar(graficos, color = "orange") {
    graficos.fillStyle = color;
    graficos.strokeStyle = "white";
    graficos.beginPath();
    graficos.arc(
      parseInt(this.posicion.x),
      parseInt(this.posicion.y),
      this.radio,
      0,
      2 * Math.PI
    );
    graficos.closePath();
    graficos.fill();
    graficos.stroke();
  }

  proyectar(vProyeccion) {
    let centro = FsVector.Dot(this.posicion, vProyeccion);
    let min = centro - this.radio;
    let max = centro + this.radio;

    return { min, max };
  }

  colisionCirculo(circulo) {
    let vSub = FsVector.Sub(circulo.posicion, this.posicion);
    let distancia = FsVector.Modulo(vSub);
    let sumRadios = circulo.radio + this.radio;

    if (sumRadios > distancia) {
      vSub.x /= distancia;
      vSub.y /= distancia;
      let dir = vSub;
      let profundidad = sumRadios - distancia;
      return { profundidad, dir };
    }

    return { profundidad: 0, dir: null };
  }
  colisionPoligono(poligono) {
    let colision = poligono.colisionCirculo(this);
    if (colision.profundidad == 0) return colision;
    colision.dir.x *= -1;
    colision.dir.y *= -1;
    return colision;
  }
}
class FsMath {
  static procesarCuerpos(cA, cB) {
    if (cA.esEstatico && cB.esEstatico) return;
    let colision = null;
    if (cB instanceof FsPoligono) {
      colision = cA.colisionPoligono(cB);
    } else if (cB instanceof FsCirculo) {
      colision = cA.colisionCirculo(cB);
    }
    if (colision.profundidad == 0) return;
    let { n, vsColision, profundidad } = colision;
    this.configVelocidadColision(cA, cB, n, vsColision);
    if (cA.esEstatico) {
      cB.mover(-n.x * profundidad, -n.y * profundidad);
    } else if (cB.esEstatico) {
      cA.mover(n.x * profundidad, n.y * profundidad);
    } else {
      cA.mover((n.x * profundidad) / 2, (n.y * profundidad) / 2);
      cB.mover((-n.x * profundidad) / 2, (-n.y * profundidad) / 2);
    }
  }

  static calcularColision(cA, cB, normales) {
    let inProyeccionFinal = { profundidad: Number.MAX_SAFE_INTEGER };
    for (let n of normales) {
      let pr1 = cA.proyectar(n);
      let pr2 = cB.proyectar(n);
      let inProyeccion = FsMath.InterseccionProyeccion(pr1, pr2, n);
      if (inProyeccion.profundidad == 0) {
        return inProyeccion;
      }
      if (inProyeccion.profundidad < inProyeccionFinal.profundidad) {
        inProyeccionFinal = inProyeccion;
      }
    }
    let vsInterseccion = inProyeccionFinal.vsInterseccion;
    let n = inProyeccionFinal.n;
    let nPerpendicular = new FsVector(n.y, -n.x);
    let proyeccion = FsMath.proyectarVertices(vsInterseccion, nPerpendicular);

    let vsProyectados = proyeccion.vsProyectados;
    let vsColision = [];
    for (let v of vsProyectados) {
      if (v != proyeccion.vpMax.vertice && v != proyeccion.vpMin.vertice) {
        vsColision.push(v);
      }
    }
    if (vsColision.length == 0) {
      console.log("Colision sin vertices");
      vsColision = vsProyectados;
    }
    inProyeccionFinal.vsColision = vsColision;
    return inProyeccionFinal;
  }
  static proyectarVertices(vertices, vProyeccion) {
    let vpMin = { size: Number.MAX_SAFE_INTEGER };
    let vpMax = { size: Number.MIN_SAFE_INTEGER };
    let vsProyectados = [];
    let sizes = [];
    for (let vertice of vertices) {
      let size = FsVector.Dot(vertice, vProyeccion);

      if (size < vpMin.size) {
        vpMin.vertice = vertice;
        vpMin.size = size;
      }
      if (size > vpMax.size) {
        vpMax.vertice = vertice;
        vpMax.size = size;
      }
      vsProyectados.push(vertice);
      sizes.push(size);
    }

    return { vpMin, vpMax, vsProyectados, sizes };
  }
  static InterseccionProyeccion(pr1, pr2, normal) {
    if (pr1.vpMax.size <= pr2.vpMin.size || pr2.vpMax.size <= pr1.vpMin.size) {
      return { profundidad: 0 };
    }
    let n = normal;
    let maxSize = pr2.vpMax.size;
    let minSize = pr1.vpMin.size;
    let profundidad1 = pr2.vpMax.size - pr1.vpMin.size;
    let profundidad2 = pr1.vpMax.size - pr2.vpMin.size;
    let profundidad = profundidad1;
    if (profundidad2 < profundidad1) {
      n = new FsVector();
      FsVector.Invert(normal, n);
      profundidad = profundidad2;
      maxSize = pr1.vpMax.size;
      minSize = pr2.vpMin.size;
    }
    let vsProyectados = [...pr1.vsProyectados, ...pr2.vsProyectados];
    let sizes = [...pr1.sizes, ...pr2.sizes];
    let vsInterseccion = [];

    for (let i = 0; i < vsProyectados.length; i++) {
      let v = vsProyectados[i];
      let size = sizes[i];
      if (size >= minSize && size <= maxSize) {
        vsInterseccion.push(v);
      }
    }
    return { profundidad, n, vsInterseccion };
  }
  static configVelocidadColision(cA, cB, n, vsColision) {
    let vc = vsColision[0];
    let rAP = new FsVector(vc.x - cA.posicion.x, vc.y - cA.posicion.y);
    let aux = rAP.x;
    rAP.x = rAP.y;
    rAP.y = -aux;

    let rBP = new FsVector(vc.x - cB.posicion.x, vc.y - cB.posicion.y);
    aux = rBP.x;
    rBP.x = rBP.y;
    rBP.y = -aux;
    let rAPN = Math.pow(FsVector.Dot(rAP, n), 2);
    let rBPN = Math.pow(FsVector.Dot(rBP, n), 2);

    let vAP = FsVector.Sum(
      cA.velocidad,
      FsVector.Mult(rAP, cA.velocidadAngular)
    );
    let vBP = FsVector.Sum(
      cB.velocidad,
      FsVector.Mult(rBP, cB.velocidadAngular)
    );
    let vAB = FsVector.Sub(vAP, vBP);

    let jp1 = FsVector.Mult(vAB, -(1 + Fisica.E));
    let jp2 = FsVector.Dot(jp1, n);
    let j =
      jp2 /
      (cA.masaInv +
        cB.masaInv +
        rAPN * cA.momentoInerciaInv +
        rBPN * cB.momentoInerciaInv);

    let vrA = FsVector.Dot(rAP, FsVector.Mult(n, j)) * cA.momentoInerciaInv;
    let vrB = FsVector.Dot(rBP, FsVector.Mult(n, j)) * cB.momentoInerciaInv;

    let vlA = FsVector.Mult(n, j * cA.masaInv);
    let vlB = FsVector.Mult(n, j * cB.masaInv);

    cA.velocidadAngular += vrA;
    cB.velocidadAngular -= vrB;
    cA.velocidad.x += vlA.x;
    cA.velocidad.y += vlA.y;
    cB.velocidad.x -= vlB.x;
    cB.velocidad.y -= vlB.y;
  }

  static calcularArea(points) {
    let area = 0;
    for (let i = 1; i < points.length - 1; i++) {
      const v1 = FsVector.Sub(points[i + 1], points[0]);
      const v2 = FsVector.Sub(points[i], points[0]);
      area += FsVector.Cross(v1, v2) / 2;
    }
    return Math.abs(area);
  }
  static calcularMomentoInercia(points, density) {
    let momentOfInertia = 0;
    for (let i = 1; i < points.length - 1; i++) {
      const p1 = points[i - 1],
        p2 = points[i],
        p3 = points[i + 1];

      const w = FsVector.Distancia(p1, p2);
      const w1 = Math.abs(
        FsVector.Dot(FsVector.Sub(p1, p2), FsVector.Sub(p3, p2)) / w
      );
      const w2 = Math.abs(w - w1);

      const signedTriArea =
        FsVector.Cross(FsVector.Sub(p3, p1), FsVector.Sub(p2, p1)) / 2;
      const h = (2 * Math.abs(signedTriArea)) / w;

      const p4 = FsVector.Sum(p2, FsVector.Mult(FsVector.Sub(p1, p2), w1 / w));

      const cm1 = {
        x: (p2.x + p3.x + p4.x) / 3,
        y: (p2.y + p3.y + p4.y) / 3,
      };
      const cm2 = {
        x: (p1.x + p3.x + p4.x) / 3,
        y: (p1.y + p3.y + p4.y) / 3,
      };

      const I1 = density * w1 * h * ((h * h) / 4 + (w1 * w1) / 12);
      const I2 = density * w2 * h * ((h * h) / 4 + (w2 * w2) / 12);
      const m1 = 0.5 * w1 * h * density;
      const m2 = 0.5 * w2 * h * density;

      const I1cm = I1 - m1 * Math.pow(FsVector.Distancia(cm1, p3), 2);
      const I2cm = I2 - m2 * Math.pow(FsVector.Distancia(cm2, p3), 2);

      const momentOfInertiaPart1 =
        I1cm + m1 * Math.pow(FsVector.Modulo(cm1), 2);
      const momentOfInertiaPart2 =
        I2cm + m2 * Math.pow(FsVector.Modulo(cm2), 2);
      if (FsVector.Cross(FsVector.Sub(p1, p3), FsVector.Sub(p4, p3)) > 0) {
        momentOfInertia += momentOfInertiaPart1;
      } else {
        momentOfInertia -= momentOfInertiaPart1;
      }
      if (FsVector.Cross(FsVector.Sub(p4, p3), FsVector.Sub(p2, p3)) > 0) {
        momentOfInertia += momentOfInertiaPart2;
      } else {
        momentOfInertia -= momentOfInertiaPart2;
      }
    }
    return Math.abs(momentOfInertia);
  }
}
class FsVector {
  x;
  y;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  static Modulo(v) {
    return Math.sqrt(this.SemiModulo(v));
  }
  static SemiModulo(v) {
    return v.x * v.x + v.y * v.y;
  }
  static CreateVector(angulo, tam) {
    let rad = toRadians(angulo);
    return new FsVector(Math.cos(rad) * tam, -Math.sin(rad) * tam);
  }
  static normalizar(v, vr = new FsVector()) {
    let tam = Math.sqrt(v.x * v.x + v.y * v.y);
    let x = v.x / tam;
    let y = v.y / tam;
    vr.x = x;
    vr.y = y;
    return vr;
  }
  static Dir(v) {
    let tam = Math.sqrt(v.x * v.x + v.y * v.y);

    return new FsVector(v.x / tam, v.y / tam);
  }
  static Distancia(v1, v2) {
    let sub = FsVector.Sub(v1, v2);
    return FsVector.Modulo(sub);
  }
  static Dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static Cross(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
  }

  static Sum(v1, v2, vr = new FsVector()) {
    vr.x = v1.x + v2.x;
    vr.y = v1.y + v2.y;
    return vr;
  }
  static Sub(v1, v2, vr = new FsVector()) {
    let x = v1.x - v2.x;
    let y = v1.y - v2.y;
    vr.x = x;
    vr.y = y;
    return vr;
  }
  static Invert(v, vr = new FsVector()) {
    vr.x = -v.x;
    vr.y = -v.y;
    return vr;
  }
  static Mult(v, num) {
    return new FsVector(v.x * num, v.y * num);
  }
  static Div(v, num) {
    return new FsVector(v.x / num, v.y / num);
  }
  static Rotation(v, rad, vr = new FsVector()) {
    // let rad = toRadians(-angulo);
    let sin = Math.sin(-rad);
    // sin = senoDe(toDegrees(-rad));
    // console.log(sin,senoDe(toDegrees(-rad)),"::",toDegrees(-rad),-rad);
    let cos = Math.cos(-rad);
    let vx = cos * v.x - sin * v.y;
    let vy = sin * v.x + cos * v.y;
    vr.x = vx;
    vr.y = vy;
    return vr;
  }

  static Equals(v1, v2) {
    return v1.x == v2.x && v1.y == v2.y;
  }
}
