//Devuelve la posicion del numero que se busca
function busqueda_binaria(arr,elem){
    //Definimos nuestro menor y mayor iniciales
    let menor = 0;
    let mayor = arr.length - 1;

    while(menor <= mayor){
        //En caso de que el rango sea "par", se redondea hacia abajo
        const medio = ((menor + mayor) - ((menor + mayor) % 2)) / 2;
        const estimado = arr[medio];

        if(estimado === elem) return medio;
        
        if (estimado > elem)
            mayor = medio-1; // Descartamos el medio y su derecha.
        else
            menor = medio+1; // Descartamos el medio y su izquierda.
    }
    return null;

}

const res = busqueda_binaria([1,2,3,4,5,6,7],4);
console.log(res);


/*  EJERCICIOS - PREGUNTAS

    1.1 Supón que tienes una lista ordenada de 128 nombres y estás 
    realizando una búsqueda binaria. ¿Cuál es es el máximo número de 
    pasos que necesitarás para completarla?
    R:  La forma de calcular el máximo número de pasos es con:
            log₂(n)
        Por lo tanto sería:
            log₂(128) = 7
            porque: 2⁷ = 128 (2×2×2×2×2×2×2 = 128)  
        Entonces, el máximo son 7 pasos.
            
    1.2 Supón que duplicas el tamaño de la lista. ¿Cuál es el máximo
    número de pasos ahora?
    R:  Cada vez que se duplica el tamaño de la lista aumenta un paso.
        Por lo tanto, si el doble de 128 es 256:
            log₂(256) = 8
        Entonces, el máximo son 8 pasos.


    NOTA 1: La búsqueda binaria recibe una lista ordenada de elementos.
            Comienza comparando el elemento del medio con el buscado:
                    ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
                    │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │
                    └───┴───┴───┴───┴───┴───┴───┴───┴───┘
                                      ↑
            Si es igual devuelve su indice, terminando la búsqueda.
            
            Si no era, compara si el buscado es mayor o menor:
                Si es menor, se queda con el rango de la izquierda.
                        ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
                        │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │
                        └───┴───┴───┴───┴───┴───┴───┴───┴───┘
                        └── Izquierda ──┘
            
                Si es mayor, se queda con el rango de la derecha.
                        ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
                        │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │
                        └───┴───┴───┴───┴───┴───┴───┴───┴───┘
                                            └─── Derecha ───┘

                En ambos casos, el elemento del medio se descarta 
                porque ya fue comprobado.

            Se vuelve a repetir el proceso con el nuevo rango.

            De esta forma el algoritmo elimina la mitad de los elementos
            en cada iteración, hasta encontrarlo o hasta que el rango
            quede vacío (en ese caso devuelve null).

            Este algoritmo tiene un costo de: O(log₂(n)).
            
    NOTA 2: Si el rango tiene una cantidad de elementos "par", no habría 
            elemento medio exacto, sino dos centrales:
                    ┌───┬───┬───┬───┬───┬───┬───┬───┐
                    │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │
                    └───┴───┴───┴───┴───┴───┴───┴───┘
                                └ MEDIO ┘

            La búsqueda binarias normalmente redondea hacia abajo el
            índice del medio, por lo que el medio resulta ser el menor
            de los dos centrales. 
                    ┌───┬───┬───┬───┬───┬───┬───┬───┐
                    │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │
                    └───┴───┴───┴───┴───┴───┴───┴───┘
                                  ↑

    NOTA 3: La expresión para determinar el máximo número de pasos 
            es log₂(n), ya que en cada paso se divide el total de 
            la lista en 2 partes.

    NOTA 4: Los "logaritmos" son la inversa que "los exponenciales".
            log₂(128) = 7   ⟷   2⁷ = 128 

*/