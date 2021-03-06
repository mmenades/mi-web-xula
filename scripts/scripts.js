mail_to = "mmenades3@gmail.com"
menu_active = false
cursor_seleccionado = 0
corazones_completados = 0
completado = false
faviconURL = "/mi-web-xula/imagesweb/generales/cosasextra/easterfill.svg"
menu_class = ["menu", "menu-scrollable", "drop-title", "link",
            "sublink-container", "sublink", "cursor-selector",
            "cursor-circle-1", "cursor-circle-2", "cursor-circle-3",
            "sublink-down"]


/**
 * 
 * @param {*} nombre Contenido del input nombre
 * @param {*} email Contenido del input email
 * @param {*} propuesta Contenido del input propuesta
 */
function enviarMail(nombre, email, propuesta){
    var subject = "Email desde la web"
    var body = "Nombre:" + nombre+ ", Email: "+ email + ", Propuesta: "+ propuesta
    window.location = 'mailto:'+mail_to+'?body='+ encodeURIComponent(body) +'&subject='+ encodeURIComponent(subject);
}
/**
 * Obtiene los datos del formulario 'Contacto' y lo envia al adminisitrador de la web
 */
function enviarMailAlAdmin() {
    const nombre = document.getElementById('nombre').value ||""
    const email = document.getElementById('mail').value ||""
    const propuesta = document.getElementById('propuesta').value ||""
    enviarMail(nombre, email, propuesta)
}
/**
 * Dada la URL de la imagen del favicon desde la carpeta base, 
 * crea el elemento del link y lo agrega al head.
 * @param {*} imgURL URL de la imagen a poner como favicon
 */
function setFavicon(imgURL){
    let base_url = window.location.origin;
    const url = base_url + imgURL
    let head = document.querySelector('head');
    // <link></link>
    let faviconLink = document.createElement('link');
    // <link rel="shortcut icon" href=<imgURL>></link>
    faviconLink.setAttribute('rel','shortcut icon');
    faviconLink.setAttribute('href',url);
    head.appendChild(faviconLink);
}

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
a??ade la etiqueta '.active' al menu o la quita.
*/
function toggleMenu() {
    const menu = document.getElementById("menu")

    if([...menu.classList].includes("active")){
        menu.classList.remove("active")
        menu_active = false
    }else{
        menu.classList.add("active")
        menu_active = true
    }
}

/**
 * Comprueba si se esta haciendo el click fuera del menu y, si este
 * al darse dicho caso, este est?? activo, se cerrar?? el menu.
 * @param {*} event Evento generado por el listener del click 
 */
function closeMenuOnClick(event) {
    const toggleButton = document.getElementsByClassName("container-main").item(0).children[0].children[1]
    const eventClass = [...event.target.classList][0]
    let menuContainer = document.getElementsByClassName("menu")[0]
       
    if(!menu_class.includes(eventClass) && 
        !menuContainer.contains(event.target) && 
        !toggleButton.contains(event.target) && 
        menu_active){
        // Clique fuera del menu
        toggleMenu()
    }
}

/* 
Cambia los cursores al que pasemos como parametro, donde 
el 0 ser?? el magenta, el 1 el cursor azul y el 2 el 
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
 * Dado el corazon activo como hijo, eliminar?? todas las clases
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
 * corresponden a el y sstituir?? sus clases activas turnando la 
 * grande en peque??a y vice-versa.
 * @param {*} child Corazon que se activo
 * @param {*} active_img El orden empezando por 0 del coraz??n que
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
    

    // A??ado las clases de grande 
    childs[active_img].classList.add("swap-foto-grande")
    childs[active_img].classList.remove("swap-foto-peque")
    childs[active_img].children[0].classList.add("imagen-grande")
    childs[active_img].children[0].classList.remove("imagen-peque")
    
}

/**
 * Accionador de los corazones, el cual cambia los corazones de
 * tama??o asi como cambia la configuracion de la imagen activa 
 * de tal forma que sea grando mientras las demas sean peque??as.
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
 * al contenedor com??n e invoca el metodo de toggleCOrazones sobre el
 * para activar la imagen buscada
 * @param {*} a Elemento actual de la imagen
 * @param {*} img ID de la imagen que se tiene que seleccionar, [0,1]
 */
function toggleCorazonesF(a, img) {
    const corazon = a.parentElement.parentNode.parentNode.children[1].children[0]
    toggleCorazones(corazon, img)
}

/**
 * Dado el URL de una melodia, la tocar?? en la web
 * @param {*} audio La URL del mp3 a sonar 
 */
function tocarMelodia(melodia){
    var audio = new Audio(melodia)
    audio.volume = 0.2
    audio.play()
}
/**
 * El metodo har?? parpadear los corazones correspondientes
 * al id "corazoncitos" 3 veces y despu??s les quitar?? la clase del
 * CSS "corazon-enamorado" a cada uno, de esta forma los 
 * resetear?? a su estado inicial
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
    setFavicon(faviconURL)
}

window.onclick = function(event){
    closeMenuOnClick(event)
}