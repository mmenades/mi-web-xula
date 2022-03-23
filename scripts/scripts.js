cursor_seleccionado = 0
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
    }else if(color == 1){
        cursor_seleccionado = 1
        cursor.classList.add('cursor-azul')
    }else{
        cursor_seleccionado = 2
        cursor.classList.add('cursor-verde')
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
    childs[(active_img + 1) % 2].classList.add("mt1-foto-peque")
    childs[(active_img + 1) % 2].classList.remove("mt1-foto-grande")
    // Cambio las clases de las imagenes que se encuentran dentro del contenedor
    childs[(active_img + 1) % 2].children[0].classList.add("imagen-peque")
    childs[(active_img + 1) % 2].children[0].classList.remove("imagen-grande")
    

    // Añado las clases de grande 
    childs[active_img].classList.add("mt1-foto-grande")
    childs[active_img].classList.remove("mt1-foto-peque")
    childs[active_img].children[0].classList.add("imagen-grande")
    childs[active_img].children[0].classList.remove("imagen-peque")
    
}

/**
 * ccionador de los corazones, el cual cambia los corazones de
 * tamaño asi como cambia la configuracion de la imagen activa 
 * de tal forma que sea grando mientras las demas sean pequeñas.
 * @param {*} a S
 * @param {*} img 
 */
function toggleCorazones(a, img) {
    // Cambiamos los botones
    quitaClases(a, img)

    // Cambiamos las imagenes
    cambiaImagenes(a, img)
}

