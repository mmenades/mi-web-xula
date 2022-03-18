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
        cursor.classList.add('cursor-mag')
    }else if(color == 1){
        cursor.classList.add('cursor-azul')
    }else{
        cursor.classList.add('cursor-verde')
    }
}

