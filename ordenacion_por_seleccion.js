// ------------------------------------------
// Versión 1: CON ARRAY AUXILIAR (push + splice)
// ------------------------------------------
function ordenacion_seleccion(listaOriginal){
    let listaNueva = [];
    let listaCopia = [...listaOriginal];

    for(const _ of listaOriginal){
        let menor = 0;
        for(let i = 1; i < listaCopia.length; i++){
            if (listaCopia[i] < listaCopia[menor])
                menor = i; //Si encontramos un menor elem
        }
        
        //Lo agregamos al nuevo array y lo sacamos del otro
        listaNueva.push(listaCopia[menor]);
        listaCopia.splice(menor,1);
    }
    return listaNueva;
}

const resV1 = ordenacion_seleccion([10,60,40,30,20,50]);
console.log(resV1);

/*  NOTAS - V1
    
    NOTA 1: Esta versión trabaja con dos listas (arrays):
                1.  La copia - Contiene los elem. que faltan por ordenar:
                    Inicialmente contiene todos los elementos, y a
                    medida que se va determinando el menor (en cada
                    iteración), se van eliminando de esta lista.
                    
                2.  La nueva - Contiene los elementos ya ordenados:
                    Inicialmente está vacia, y se va llenando con los
                    elementos menores de cada iteración. De forma que
                    quedan los elementos ordenados.
            
            En cada iteración, se busca al menor de la copia y lo pasa
            a la nueva lista.

            Ejemplo con la lista [3, 1, 2]:

                Iteración 1:    Copia           Nueva
                                ┌───┬───┬───┐   ┌─┐
                                │ 3 │ 1 │ 2 │   │ │ (Vacía)
                                └───┴───┴───┘   └─┘
                                      ↑
                                El menor es 1.
            
                Iteración 2:    Copia       Nueva
                                ┌───┬───┐   ┌───┐
                                │ 3 │ 2 │   │ 1 │
                                └───┴───┘   └───┘
                                      ↑
                                El menor es 2.
            
                Iteración 3:    Copia   Nueva
                                ┌───┐   ┌───┬───┐
                                │ 3 │   │ 1 │ 2 │
                                └───┘   └───┴───┘
                                  ↑
                                El menor es 3.

                RESULTADO:      Copia   Nueva
                                ┌─┐     ┌───┬───┬───┐
                                │ │     │ 1 │ 2 │ 3 │
                                └─┘     └───┴───┴───┘

    NOTA 2: En el bucle externo: En base al número de elementos que tenga 
            la lista original será el número de iteraciones, por eso el 
            "for...of" con "_", ya que no se necesita el valor, solo contar 
            las iteraciones. Se pudiera utilizar un "while > 0" también.

            En el bucle interno: Se empieza desde el indice 1, ya que por
            defecto el elemento del indice 0 siempre es el menor, por lo
            tanto, no hace falta compararlo.
    
    NOTA 3: El método "splice(menor, 1)", al eliminar el elemento tiene que
            recorrer los elementos de su derecha para tapar el hueco. Esto
            tiene un coste de O(n) en cada iteración.

    NOTA 4: Esta versión tiene un costo de:
                Tiempo:     O(n²), porque en cada iteracion (externa) se 
                            recorre toda la copia en busqueda del num. menor.
                Memoria:    O(n), porque se crea otra lista extra del mismo
                            tamaño.

*/


// ------------------------------------------
// Versión 2: INTERCAMBIANDO ELEMENTOS
// ------------------------------------------
function ordenacion_seleccion_2(lista) {
    let arr = [...lista];

    for (let i = 0; i < arr.length - 1; i++) {
        let menor = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[menor]) menor = j; //Si encontramos un menor elem
        }
        [arr[i], arr[menor]] = [arr[menor], arr[i]]; // intercambio
    }
    return arr;
}

/*  NOTAS - V2
    
    NOTA 1: Esta versión NO crea una segunda lista. Esta divide la lista en dos
            zonas imaginarias, las cuales son separadas por la posición "i":

                        ┌───┬───┬───┬───┬───┬───┬───┐
                        │ 1 │ 2 │ 3 │ 5 │ 4 │ 7 │ 6 │
                        └───┴───┴───┴───┴───┴───┴───┘
                                      ↑
                                      i
                        └ ordenada ─┘└ sin ordenar ─┘
            
            Los elementos a la izquierda de "i" ya se encuentran ordenados y no
            se vuelven a tocar. A la derecha de "i" siguen desordenados.
    
            En cada iteración se busca el menor en la zona desordenada y se
            intercambia con el elemento que está en "i".

            Ejemplo con la lista [3, 1, 2]:

                i = 0   ┌───┬───┬───┐
                        │ 3 │ 1 │ 2 │
                        └───┴───┴───┘
                          ↑   ↑
                          i   menor
                
                i = 1   ┌───┬───┬───┐
                        │ 1 │ 3 │ 2 │
                        └───┴───┴───┘
                              ↑   ↑
                              i   menor
                
                Final   ┌───┬───┬───┐
                        │ 1 │ 2 │ 3 │
                        └───┴───┴───┘

    NOTA 2: El valor maximo que alcanza "i" corresponde al penúltimo elemento,
            porque cuando queda solo un único elmento por ordenar, este ya está
            está ordenado automáticamente (es el mayor).

            El iterador "j" empieza en i + 1 porque arr[i] se considera el menor
            inicialmente y no tiene caso compararlo consigo mismo.

            Si menor es igual a i, el intercambio es consigo mismo y no cambia
            nada. Funciona bien, solo es un intercambio "inútil".

    NOTA 3: Esta versión tiene un costo:
                Tiempo:     O(n²) siempre, aunque la lista ya esté ordenada,
                            porque siempre recorre toda la zona sin ordenar.
                Memoria:    O(1), solo usa i, j y menor.

*/


const resV2 = ordenacion_seleccion_2([3,1,2]);
console.log(resV2);


/*  DIFERENCIAS ENTRE AMBAS VERSIONES

    ┌────────────────────┬─────────────────────┬─────────────────────┐
    │                    │ V1 (push + splice)  │ V2 (swap)           │
    ├────────────────────┼─────────────────────┼─────────────────────┤
    │ Lista auxiliar     │ Sí                  │ No                  │
    │ Memoria extra      │ O(n)                │ O(1)                │
    │ Tiempo             │ O(n²)               │ O(n²)               │
    │ Estable            │ Sí                  │ No                  │
    └────────────────────┴─────────────────────┴─────────────────────┘

    Un algoritmo es "ESTABLE" si, al haber elementos con el mismo
    valor, conserva el orden relativo que tenían en la lista
    original.
    
    Por ejemplo con [3a, 3b, 1]:

        V1 splice (estable):   [3a, 3b, 1] → [1, 3a, 3b]
        V2 swap (inestable):   [3a, 3b, 1] → [1, 3b, 3a]

    Aunque: Si en la versión con splice se usara "<=" en vez de "<",
            se quedaría con el ÚLTIMO menor encontrado y dejaría de ser
            estable.

    A tomar en cuenta:  Existen otros mejores algoritmos de ordenación que
                        la ordenación por selección.

*/
