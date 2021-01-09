/**
 * Problema número 2.
 *
 * Genera un script/algoritmo/función que sea capaz de transformar los datos de input-p2.csv
 * en un arból de estructura similar al problema de p1 utilizando la estructura de Nodo.js
 */

const Nodo = require("./src/Nodo");
const raiz = new Nodo("root", "Raíz");

/* Se utiliza la libreria csvtojson  url: https://www.npmjs.com/package/csvtojson */

// Se instancia el uso de la libreria csvtojson.
const csv = require("csvtojson");

// Se genera una función que agregue la data del .CSV a la raiz.
const generarEstructuraNodo = async () => {
    // Se llama el path de la ubicación del .CSV.
    const csvFilePath = "./src/input-p2.csv";

    // Generamos las variables de comparación.
    let sedeAnterior = "";
    let cursoAnterior = "";
    let seccionAnterior = "";

    // Se genera script para parsear el .CSV a  JSON Array
    const jsonArray = await csv().fromFile(csvFilePath);

    // Se recorre el CSV. ya parseado que se encuentra almacenado en la variable jsonArray
    jsonArray.forEach((element) => {
        // Se valida si la sede actual es distinta a la sede anterior
        if (element.Sede != sedeAnterior) {
            // Se establece el valor de la sede actual a la sede anterior.
            sedeAnterior = element.Sede;
            // Se hace un push a los hijos del Nodo Raiz añadiendo las sedes.
            raiz.hijos.push({ nombre: element.Sede, tipo: "Sede", hijos: [] });
        }
    });

    // Se ordenan el array por cursos
    sortArr = sort_by_key(jsonArray, "Curso");

    // Se recorre la raiz
    raiz.hijos.forEach((sede) => {
        // Recorremos los hijos de las sedes
        sortArr.forEach((data) => {
            // Se valida el nombre de la sede actual y la sede del csv que ya viene parseada que sean iguales.
            if (sede.nombre === data.Sede) {
                // se valida que el curso anterior sea distinto al curso de la data ordenada que se esta recorriendo
                if (cursoAnterior != data.Curso) {
                    // Se asigna el valor actual a la variable curso anterior
                    cursoAnterior = data.Curso;
                    // Se añaden los  cursos a las sedes
                    sede.hijos.push({
                        nombre: data.Curso,
                        tipo: "Curso",
                        hijos: [],
                    });
                }
            }
        });
    });

    // Se ordenan el array por cursos
    sortArr = sort_by_key(jsonArray, "Seccion");

    // Se recorre la raiz
    raiz.hijos.forEach((sede) => {
        // Se recorren los hijos de las sedes ( cursos )
        sede.hijos.forEach((curso) => {
            // Se recorre el arreglo ordenado por cursos
            sortArr.forEach((data) => {
                // Se valida que el la sede y el curso sean iguales a la data del CSV
                if (sede.nombre === data.Sede && curso.nombre === data.Curso) {
                    // Se valida que la seccion anterior y la seccion actual de la data sean distintas
                    if (seccionAnterior != data.Seccion) {
                        // Se almacena la seccion actual en la variable seccion anterior
                        seccionAnterior = data.Seccion;
                        //  Se añaden las secciones los cursos correspondientes
                        curso.hijos.push({
                            nombre: data.Seccion,
                            tipo: "Seccion",
                            hijos: [],
                        });
                    }
                }
            });
        });
    });

    // Se recorre la raiz
    raiz.hijos.forEach((sede) => {
        // Se recorren los hijos de las sedes ( cursos )
        sede.hijos.forEach((curso) => {
            // Se recorren los hijos de los cursos
            curso.hijos.forEach((seccion) => {
                // Se recorre el .CSV almacenado y parseado en la variable jsonArray
                jsonArray.forEach((data) => {
                    // Se valida que el nombre de la sede, el nombre del curso y el nombre de la seccion sean iguales a la data recorrida
                    // En este caso la información del jsonArray
                    if (
                        sede.nombre === data.Sede &&
                        curso.nombre === data.Curso &&
                        seccion.nombre === data.Seccion
                    ) {
                        //Se almacenan las ofertas en las secciones.
                        seccion.hijos.push({
                            nombre: data.Oferta,
                            tipo: "Oferta",
                            hijos: [],
                        });
                    }
                });
            });
        });
    });

    // Se retorna el nodo raiz
    return raiz;
};

// Se crea una función la cual ordena los arreglos en base a la key del json.
const sort_by_key = (array, key) => {
    return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
    });
};

// Obtenemos la raiz manejando la promesa
generarEstructuraNodo().then((resp) => console.log(resp));
