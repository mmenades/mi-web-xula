const MELODIA = "./../../../sonidos/mario_bros_tuberia.mp3"
cursor_seleccionado = 0
corazones_completados = 0
completado = false

/**
 * Crea el candado para evitar las invocaciones paralelas
 * del mismo metodo
 */
const createLock = () => {
    let lockStatus = false
    const release = () => {
        lockStatus = false
    }
    const acuire = () => {
        if (lockStatus == true)
            return false
        lockStatus = true
        return true
    }
    return {
        lockStatus: lockStatus, 
        acuire: acuire,
        release: release,
    }
}
candado = createLock()

/* 
Sirve para alternar el menu entre visible y no visible,
añade la etiqueta '.active' al menu o la quita.
*/
function toggleMenu() {
    const menu = document.getElementById("menu")

    if([...menu.classList].includes("active")){
        menu.classList.remove("active")
    }else{
        menu.classList.add("active")
    }
}

/* 
Cambia los cursores al que pasemos como parametro, donde 
el 0 será el magenta, el 1 el cursor azul y el 2 el 
cursor azul por defecto. 
*/
function cambiaCursor(color) {
    const cursor = document.querySelector('body')
    cursor.classList.remove('cursor-mag')
    cursor.classList.remove('cursor-azul')
    cursor.classList.remove('cursor-verde')

    if(color == 0){
        cursor_seleccionado = 0
        cursor.classList.add('cursor-mag')
        localStorage.setItem('cursor', 0)
    }else if(color == 1){
        cursor_seleccionado = 1
        cursor.classList.add('cursor-azul')
        localStorage.setItem('cursor',1)
    }else{
        cursor_seleccionado = 2
        cursor.classList.add('cursor-verde')
        localStorage.setItem('cursor', 2)
    }
}
/**
 * Rescata el valor del cursor seleccionado en caso de 
 * existirlo en el local storage, en caso contrario, 
 * selecciona el cursor por defecto
 */
function seleccionaCursor(){
    const cursor = localStorage.getItem('cursor')
    if(cursor){
        cambiaCursor(cursor)
    }else{
        cambiaCursor(0)
    }
}

/**
 * Dado el corazon activo como hijo, eliminará todas las clases
 * activas a todos los corazones que pudieran haber ahi.
 */
function quitaClases(child, seleccionado) {
    const childs = [...child.parentElement.children]
    // Recorremos todos los hijos para evr que clases tienen
    for(let i=0; i < childs.length; i++) {
        // Anulamos sus clases
        if([...childs[i].classList].includes('active_img')){
            childs[i].classList.remove('active_img')
            childs[i].classList.add("inactive_img")
        }
    }
    // Dejo activo el boton pulsado
    childs[seleccionado].classList.remove("inactive_img")
    childs[seleccionado].classList.add("active_img")
}

/**
 * Dado el corazon activado como hijo, buscara las imagenes que 
 * corresponden a el y sstituirá sus clases activas turnando la 
 * grande en pequeña y vice-versa.
 * @param {*} child Corazon que se activo
 * @param {*} active_img El orden empezando por 0 del corazón que
 *                      fue activado
 */
function cambiaImagenes(child, active_img) {
    // subiendo y bajando a las clases para cambiar cosas
    const img_split = child.parentElement.parentNode.children[0]
    // Cambiando las clases 
    const childs = img_split.children
    console.log(childs[0].children)
    console.log(childs[1].children)

    // Seleccionando la imagen adecuada para que sea la grande
    // Quito la clase del grande al contenedor de la imagen hgrande
    childs[(active_img + 1) % 2].classList.add("swap-foto-peque")
    childs[(active_img + 1) % 2].classList.remove("swap-foto-grande")
    // Cambio las clases de las imagenes que se encuentran dentro del contenedor
    childs[(active_img + 1) % 2].children[0].classList.add("imagen-peque")
    childs[(active_img + 1) % 2].children[0].classList.remove("imagen-grande")
    

    // Añado las clases de grande 
    childs[active_img].classList.add("swap-foto-grande")
    childs[active_img].classList.remove("swap-foto-peque")
    childs[active_img].children[0].classList.add("imagen-grande")
    childs[active_img].children[0].classList.remove("imagen-peque")
    
}

/**
 * Accionador de los corazones, el cual cambia los corazones de
 * tamaño asi como cambia la configuracion de la imagen activa 
 * de tal forma que sea grando mientras las demas sean pequeñas.
 * @param {*} a Elemento actual del corazon
 * @param {*} img ID de la imagen que se tiene que seleccionar, [0,1] 
 */
function toggleCorazones(a, img) {
    // Cambiamos los botones
    quitaClases(a, img)

    // Cambiamos las imagenes
    cambiaImagenes(a, img)
}

/**
 * Dada la imagen como elemento, busca el primer corazon que pertenece
 * al contenedor común e invoca el metodo de toggleCOrazones sobre el
 * para activar la imagen buscada
 * @param {*} a Elemento actual de la imagen
 * @param {*} img ID de la imagen que se tiene que seleccionar, [0,1]
 */
function toggleCorazonesF(a, img) {
    const corazon = a.parentElement.parentNode.parentNode.children[1].children[0]
    toggleCorazones(corazon, img)
}

/**
 * Dado el URL de una melodia, la tocará en la web
 * @param {*} audio La URL del mp3 a sonar 
 */
function tocarMelodia(audio){
    var audio = new Audio(audio);
    audio.muted = false
    audio.play();
}
/**
 * El metodo hará parpadear los corazones correspondientes
 * al id "corazoncitos" 3 veces y después les quitará la clase del
 * CSS "corazon-enamorado" a cada uno, de esta forma los 
 * reseteará a su estado inicial
 */
function parpadeoCorazones(){
    const corazoncitos = document.getElementById("corazoncitos");
    for(let i=0; i <2; i++){
        setTimeout(()=> {
            for(let j=0; j<corazoncitos.children.length; j++){
                // Ejecuto un parpadeo
                const corazon = corazoncitos.children[j]
                corazon.children[0].classList.remove("corazon-enamorado")
                setTimeout(()=> {
                    corazon.children[0].classList.add("corazon-enamorado")
                }, 200)
            }
        },(10+ i*400))
    }
}
function rellenarCorazonDeAmor(items, posicion){
    const corazon = items.children[0]
    if(![...corazon.classList].includes("corazon-enamorado")) {
        corazon.classList.add("corazon-enamorado")
        corazones_completados += posicion
    }

    // Resetear cuando los corazones sean completados
    if(corazones_completados >= 28){
        if(candado.acuire()) {
            corazones_completados = 0
            parpadeoCorazones()
            tocarMelodia("./../../../sonidos/mario_bros_tuberia.wav")
            setTimeout(()=> {
                const corazoncitos = document.getElementById("corazoncitos");
                for(let j=0; j<corazoncitos.children.length; j++){
                    // Ejecuto un parpadeo
                    const corazon = corazoncitos.children[j]
                    corazon.children[0].classList.remove("corazon-enamorado")
                }
                setTimeout(()=> {
                    candado.release() 
                },500)
            },850)
        }
    }
}
window.onload = function(){ 
    // Codigo ejecutado siempre que se cargue una ventana
    seleccionaCursor()
 }