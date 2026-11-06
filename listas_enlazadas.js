// ------------------------------------------
// Versión SIN clases
// ------------------------------------------
let raiz = null;

function insertar(val, ultimo) {
    let nuevo = { val, sig: null };

    if (!raiz)
        raiz = nuevo;
    else 
        ultimo.sig = nuevo;

    return nuevo; // Nuevo último nodo
}

let ultimo = null;
ultimo = insertar(10, ultimo);
ultimo = insertar(20, ultimo);
ultimo = insertar(30, ultimo);

console.log(raiz);

// ------------------------------------------
// Versión CON clases
// ------------------------------------------
class Nodo{
    constructor(val){
        this.val = val;
        this.sig = null;
    }
}

class ListaEnlazada{
    constructor(){
        this.raiz = null;
        this.ultimo = null;
    }

    insertar(val) {
        let nuevo = new Nodo(val);

        if (!this.raiz) {
            this.raiz = nuevo;
            this.ultimo = nuevo;
        } else {
            this.ultimo.sig = nuevo;
            this.ultimo = nuevo;
        }
    }

}

let lista = new ListaEnlazada();
lista.insertar(2);
lista.insertar(5);
lista.insertar(8);

console.log(lista)

/*  EJERCICIOS - PREGUNTAS

    2.1 Supón que estás creando una aplicación para mantener el control
    de tus finanzas. Cada día, anotas todo el dinero que gastaste. Al 
    final del mes, revisas tus compras y sumas cuánto has gastado. Así 
    que tienes muchas inserciones y unas pocas lecturas. ¿Deberías 
    utilizar un array o una lista enlazada?
    R:  Una lista enlazada, porque hay más inserciones (diariamente) y 
        al no haber tantas lecturas (una vez al mes) no pago tanto el 
        coste elevado de las lecturas de la lista enlazada. Además de
        que está la ventaja que no son lecturas aleatorias, sino que son
        lecturas completas de la lista, lo cual hace que las lecturas
        no sean tan costosas (aunque lo siguen siendo más que un array).

    2.2 Supón que estás creando una aplicación para tomar pedidos de
    clientes en restaurantes. Tu aplicación necesita almacenar una
    lista de pedidos. Los meseros siguen añadiendo pedidos a la lista
    mientras los cocineros quitan pedidos de la lista para preparar los 
    platos. Es una cola ordenada: Los meseros añaden pedidos al final de 
    la cola y los cocineros sacan pedidos del principio de la cola para 
    cocinarlas.
    
    MESEROS     ├────────────────────────────────────────────────┤  COCINEROS
    AÑADEN      │    Pedido4    Pedido3    Pedido2    Pedido1    │  SACAN
    PEDIDOS     ├────────────────────────────────────────────────┤  PEDIDOS DEL
    AL FINAL           ──────── COLA DE PEDIDOS ────────►           PRINCIPIO

    ¿Usarías un array o una lista enlazada para implementar esta cola?
    R:  Una lista enlazada, ya que al final de cuentas al array solo se le 
        pueden almacenar cantidad limitada de elementos (aunque hay lenguajes 
        que si permite hacer crecer dinamicamente un array, pero igual tienen 
        la desventajas que tienen que estar haciendo reubicaciones en memoria), 
        en cambio una lista enlazada puede crecer infinitamente (el limite es 
        la memoria), y si bien es cierto que se podria solucionar con un array 
        muy grande estariamos desperdiciando memoria. Además en este caso no 
        necesito accesos aleatorios de los pedidos y tampoco habrá busquedas. 
        Y sin embargo si habrá muchas inserciones de pedidos, entonces, al ser 
        las listas enlazadas eficientes para insertar y eliminar (si guardo la 
        referencia del nodo raiz y el último nodo), esta es la opción más viable.

    
    2.3 Realicemos un experimento mental. Supón que Facebook mantiene una
    lista de nombres de usuarios. Cuando alguien intenta entrar, se realiza
    una búsqueda de su nombre de usuario. Si se encuentra en la lista, se
    le permite entrar al sitio. Las personas utilizan Facebook con
    frecuencia, así que hay muchísimas búsquedas sobre esta lista de nombres
    de usuarios.

    Supón que Facebook utiliza la búsqueda binaria para buscar en la lista. 
    La búsqueda binaria necesita acceso aleatorio, dado que tienes que acceder 
    al elemento del medio de la lista instantaneamente. Sabiendo esto, 
    ¿implementarías la lista como un array o como una lista enlazada?
    R:  Con un array, primero porque se menciona que hay muchas busquedas por
        lo que saldria muy caro el coste de las lecturas de una lista enlazada
        en comparacion con array que son más eficientes. Además de que menciona
        que utiliza la búsqueda binaria para buscar la cual requiere de acceso
        aleatorio a la lista, lo cual es el punto fuerte de los arrays. Y un
        último punto que tambien podria ser bueno considerar es que la lista
        tiene que estar ordenada y creo que es un poco más facil ordenar un
        array que una lista enlazada.


    2.4 Las personas se crean perfiles en Facebook frecuentemente. Supón que
    decidiste utilizar un array para almacenar la lista de usuarios. ¿Cuáles
    son las desventajas de emplear un array cuando se realiza una inserción?
    En particular, asume que estas utilizando búsqueda binaria para buscar
    los nombres de usuario cuando intentan acceder al sitio. ¿Qué sucede
    cuando añades nuevos usuarios al array?
    R:  Bajo la premisa de que estoy usando un lenguaje que permite hacer
        crecer un array dinamicamente (ya que no todos lo permiten), la
        principal desventaja que veo yo es que si se llena la capacidad del
        array y se presenta el caso de que en esa zona de la memoria ya no
        existe más espacio para que el array pueda crecer, el compilador 
        tendria que buscar una nueva zona en memoria la cual contenga la 
        cantidad suficiente para almacenar el array más el incremento del 
        mismo, y luego sumado a eso tiene que moverlo a esa nueva región
        de la memoria lo cual es costoso. Por lo tanto "insertar" en arrays
        es lento. Además de que si se está usando una busqueda binaria los
        elementos deben estar ordenados en todo momento, por lo tanto tiene
        que estar desplazando muchos elementos para introducir ese nuevo y 
        que la lista quede ordenada (cosa que no pasa con la lista enlazada).

    2.5 En realidad, Facebook no utiliza ni una lista enlazada ni un array
    para guardar la información del usuario. Consideremos una estructura
    de datos híbrida: un "array de listas enlazadas".

    Tienes un array de 26 posiciones. Cada posición apunta a una lista
    enlazada. Por ejemplo, la primera posición apunta a una lista enlazada
    que contiene todos los nombres de usuario que comienzan por "A". La
    segunda posición apunta a una lista enlazada que contiene los nombres
    de usuarios que comienzan por "B" y así sucesivamente.

        ┌───┐    
        │   │    ┌─────────┬───┐    ┌─────────┬───┐    ┌─────────┬───┐
        │ ⬤─│───►│  "ANA"  │ ⬤─│───►│"ALBERTO"│ ⬤─│───►│ "ANTÓN" │ ⬤─│───►
        │   │    └─────────┴───┘    └─────────┴───┘    └─────────┴───┘
        ├───┤    
        │   │    ┌─────────┬───┐    ┌─────────┬───┐    ┌─────────┬───┐
        │ ⬤─│───►│  "BLAS" │ ⬤─│───►│   "BEA" │ ⬤─│───►│ "BLANCA"│ ⬤─│───►
        │   │    └─────────┴───┘    └─────────┴───┘    └─────────┴───┘
        ├───┤
        │   │    ┌─────────┬───┐    ┌─────────┬───┐    ┌─────────┬───┐
        │ ⬤─│───►│ "CARLOS"│ ⬤─│───►│ "CURRO" │ ⬤─│───►│ "CARLA" │ ⬤─│───►
        │   │    └─────────┴───┘    └─────────┴───┘    └─────────┴───┘
        ├───┤

     └─ ARRAY ─┘└─────────────── LISTAS ENLAZADAS ────────────────────┘ 

    Supón que Álvaro se registra en Facebook y quieres añadirlo a la lista.
    Seleccionas la posición 1 del array y añades a Álvaro al final de la
    lista enlazada que se encuentra en dicha posición. Ahora supón que
    quieres buscar por el usuario "Zacarías". En este caso vas a la
    posición 26, que apunta a una lista enlazada con todos los nombres que
    comienzan por Z. Entonces, sobre esa lista, buscas el nombre de usuario
    "Zacarías". Compara esta estructura de datos híbrida con arrays y
    listas enlazadas.

    ¿Es más lenta o más rápida que arrays o listas por separado en las
    operaciones de inserción y búsqueda? 
    R:  En cuanto a la inserción, contra un array es más rápida porque
        sabemos que el array tiene que estar ordenado, lo cual implica que
        tenemos que desplazar elementos para insertar en un array y que
        quede la lista ordenada, en cambio aqui solo se agrega un nodo
        a la lista al final. Contra una lista enlazada la inserción es
        igual O(1) para ambas, obviamente siempre y cuando se agregue al 
        inicio de la sublista o al final (guardando la referencia del 
        último nodo).
        
        Ahora en cuanto a la busqueda, contra un array es más lenta, ya
        que un array ordenado te permite hacer busqueda binaria (la cual
        es muy eficiente porque tiene un coste de O(log₂ n)) y aquí se
        tiene que recorrer la sublista desde el inicio (O(n)). Sin emabrgo,
        contra una lista enlazada es más rápida ya que solo recorro la
        sublista de la letra correspondiente y no la lista completa de
        todos los usuarios. 

    R LIBRO:    Busqueda: más lenta que en los arrays, más rápida que en las
                listas enlazadas. Inserción: más rápido que en los arrays, el
                mismo tiempo que en las listas enlazadas.
                Por lo tanto, la busqueda es más lenta que en un array, pero
                es más rápida o igual que en las listas enlazadas para todo.


    NOTA 1: En un array todos los elementos se encuentran almacenados de 
            forma secuencial en memoria, por lo tanto si se llena la 
            capacidad inicial del array ("dinámico" y no todos los lenguajes
            lo soportan) se tiene que hacer un redimensionamiento, el cual
            si no tiene el suficiente espacio para crecer (memoria contigua)
            tiene que buscar otra región de la memoria en donde si quepa para
            poder moverse a esa región desocupada y que de esta forma pueda
            crecer, sumandole que tiene que copiar los elementos a esa nuevo 
            bloque y actualizar la referencia del array, lo cual puede llegar
            a ser muy costoso con arrays grandes. En cambio, las listas
            enlazadas los elementos se encuentran dispersos en la memoria, y
            cada elemento guarda la dirección del siguiente. Y así un grupo 
            de direcciones de memoria aleatorias están enlazadas entre sí.

    NOTA 2: El propósito de guardar la referencia del primer y último nodo 
            que se encuentra en la lista enlazada es: 
            
            Que la inserción y eliminación tengan una complejidad de O(1).

            Esto en caso de querer agregar/eliminar elementos al inicio o
            al final de la lista enlazada, para simular ya sea la función
            de una cola o de una pila.

            Del otro modo, si necesitáramos acceder al último elemento y no 
            se conociera el último nodo, tendríamos que recorrer toda la 
            lista para encontrarlo y la complejidad sería O(n).


    NOTA 3: Los arrays permiten lecturas rapídas, ya que permiten acceder
            a posiciones aleatorias mediante el indice, pero sus inserciones 
            son lentas porque necesitaria almacenar los elementos de forma 
            ordenada (para realizar busquedas binarias) y tendria que desplazar 
            elementos. 

            Las listas enlazadas tienen lecturas lentas, ya que no permiten
            acceder mediante su índice, obligando a recorrer la lista desde
            el inicio y no se puede realizar una busqueda binaria de forma
            eficiente. Pero permiten inserciones rapidas (guardando referencia 
            al último nodo, o insertando al inicio de la lista).

                        │ ARRAYS │ LISTAS
            ────────────┼────────┼────────
               LECTURA  │  O(1)  │  O(n)
            ────────────┼────────┼──────── 
              INSERCIÓN │  O(n)  │  O(1)
            ────────────┼────────┼────────
              SUPRESIÓN │  O(n)  │  O(1)  
            ────────────┼────────┼────────

            (Para que la inserción y eliminación sean O(1) necesitariamos tener
            la referncia al primer/último nodo)

            TODO:   Investigar bien lo de que la eliminación sea O(1), algunos
                    difieren en esto, ya que tendrían que acceder al penultimo
                    nodo de igual manera.
                    
    NOTA 4: Las listas enlazadas tienen lecturas lentas solo si buscamos acceder
            a elementos aleatorios en la lista, ya que tenemos que recorrerla 
            desde el inicio hasta encontrar el elemento. Sin enmbargo, cuando 
            solo se busca leer la lista enlazada en una sola pasada, el costo
            pasa a ser razonable. Pero sin llegar a superar a las lecturas del 
            array, ya que estos ofrecen un mayor rendimiento al estar almacenados 
            de manera contigua en memoria.

    NOTA 5: En las listas enlazadas, de forma regular no es posible conocer el
            tamaño de la lista, tendríamos que recorrerla por completo y contar
            los nodos; O también podríamos tener un contador que se vaya
            actualizando en cada inserción y en cada eliminación.

    NOTA 6: En la estructura híbrida, para llegar a la posición de la letra en
            el array es O(1), ya que el índice no se busca (es decir, no hay
            necesidad de recorrer el array), sino que se calcula a partir del
            código numérico de la letra con una sola resta, por ejemplo en JS:

            const indice = "J".charCodeAt(0) - "A".charCodeAt(0);
            // 74 - 65 = 9  →  lista[9]

            Así obtenemos el índice de la "J" y accedemos directamente a su
            posición.


*/