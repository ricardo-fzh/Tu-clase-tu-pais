/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */


const data = require("./src/input-p1.json");


// Se inicializa como variable global el contador
let contador = 0;

// Se inicializa como variable global lista que almacena todos los nodos que no tienen hijos.
let listaNodoSinHijos = [];

// Se inicializa como variable global lista que almacena todos los nodos que contienen una cantidad X (parametrizable) de hijos.
let listaNodoConHijos = [];

// Se inicializa como variable global la lista que contiene todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*.
let listaSedes = [];

// Función que retorna todos los nodos que no tienen hijos.
const obtenerNodosSinHijos = (data) => {
    // Se valida que la data contenga nodos hijos
    if (data.hijos) {
        // Se recorren los nodos hijos
        data.hijos.forEach((element) => {
            // Se valida que los nodos hijos no contengan nodos
            if (element.hijos.length <= 0) {
                // Se almacena en una lista los nodos sin hijos
                listaNodoSinHijos.push(element);
            }
            // Se utiliza recursividad
            obtenerNodosSinHijos(element);
        });
    }
    // Se retorna la lista con los nodos sin hijos
    return listaNodoSinHijos;
};

// Función que retorna todos los nodos que contienen una cantidad X (parametrizable) de hijos.
const obtenerNodosConHijos = (data) => {
    // Se valida que la data contenga nodos hijos
    if (data.hijos) {
         // Se recorren los nodos hijos
        data.hijos.forEach((element) => {
            // Se valida que los nodos hijos contengan nodos
            if (element.hijos.length > 0) {
                // Se almacena en una lista los nodos con hijos
                listaNodoConHijos.push(element);
            }
            // Se utiliza recursividad
            obtenerNodosConHijos(element);
        });
    }
    // Se retorna la lista con los nodos con hijos
    return listaNodoConHijos;
};

// Función que Contabiliza la cantidad de nodos totales
const contarTotalNodos = (data) => {
    // Se valida que la data contenga nodos hijos
    if (data.hijos) {
        // Se recorren los nodos hijos
        data.hijos.forEach((element) => {
            // Se utiliza recursividad
            contarTotalNodos(element);
        });
    }
    // Se aumenta el contador por cada vez que se utilice la recursividad
    contador++;
    // Se retorna el contador
    return contador;
};

// Función que Retorna todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
const obtenerSedes = (data) => {
    // Se valida que la data contenga nodos hijos
    if (data.hijos) {
        // Se recorren los hijos
        data.hijos.forEach((curso) => {
            // Se valida que el curso sea de 4 Medio
            if (curso.nombre === "4 Medio") {
                // Se valida que esos cursos tengan hijos
                if (curso.hijos) {
                    // Se reccorren los hijos de 4 Medio
                    curso.hijos.forEach((seccion) => {
                        // Se valida que la sección sea A
                        if (seccion.nombre === "A") {
                            // Se valida nuevamente que la sección A tenga Hijos
                            if (seccion.hijos) {
                                // Se recorren los hijos de la sección A
                                seccion.hijos.forEach((oferta) => {
                                    // Se valida que el nombre sea tecnología y el tipo sea oferta
                                    if (
                                        oferta.nombre === "Tecnología" &&
                                        oferta.tipo === "Oferta"
                                    ) {
                                        // Se añaden a una lista que almacena el nombre de las sedes
                                        listaSedes.push(data.nombre)
                                    }
                                });
                            }
                        }
                    });
                }
            }
            // Se utiliza recursividad
            obtenerSedes(curso);
        });
    }
    // Se retornan la lista con las sedes.
    return listaSedes;
};



/* ** IMPRESIÓN DE LOS RESULTADOS ** */

// Se imprime el resultado de la función obtenerNodosSinHijos(data)
const nodoSinHijos = obtenerNodosSinHijos(data);
console.log(nodoSinHijos);

// Se imprime el resultado de la función obtenerNodosConHijos(data)
const nodoConHijos = obtenerNodosConHijos(data)
console.log(nodoConHijos);

// Se imprime el resultado de la función contarTotalNodos(data);
const total = contarTotalNodos(data);
console.log(total);

// Se imprime el resultado de la función obtenerSedes
const sedes = obtenerSedes(data);
console.log(sedes)