
function validarform(){
    filtroNombre = /^[A-Z]{1}[a-z]/;
    if (!nombre.value.trim() == "") {
        if (!nombre.value.match(filtroNombre)) {
            alert('La primera el mayusculas y el resto en minusculas');//nos salta el alert
            return false;
        }
    }
    else{
        alert('Tienes que rellenar los campos');//nos salta el alert
            console.log("Error al validar Nombre");
            return false;
    }    
    if(direccion.value.trim() == ""){//comprobamos si el campo de texto esta relleno
        alert('Tienes que rellenar los campos');//nos salta el alert

        return false;//se detiene la ejecucion
    }
    filtroTelefono = /[0-9]{9}/;
    if (!telefono.value.trim() == "") {
        if (!telefono.value.match(filtroTelefono)) {
            alert('tienes que poner el numero de teledono bien');//nos salta el alert
            return false;
        }
    }
    else{
        alert('Tienes que rellenar los campos');//nos salta el alert
            return false;
    }
    /*if(telefono.value.trim() == ""){//comprobamos si el campo de texto esta relleno
        alert('Tienes que rellenar los campos');//nos salta el alert
        return false;//se detiene la ejecucion 

    }*/
    filtroEmail = /[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}/;
    //[a-zA-Z0-9._%+-] decimos que la direccion del correo antes del @ aceptamos de la todo ese tipo de caracteres
    //+@ indicamos que tenemos que tener el simbolo del @
    //?:[a-zA-Z0-9-] valoda solo el tramo que esta entre @ y el . y solo permite lo que esta dentro de []
    //+\. decimos que tiene q haber un . 
    //+[a-zA-Z]{2,4} indicamos q apartir del punto solo podemos poner 
    if (!email.value.trim() == "") {
        if (!email.value.match(filtroEmail)) {
            console.log(email.value.match(filtroEmail));
            alert('tienes que poner el correo electronico bien');//nos salta el alert
            return false;
        }
    }
    else{
        alert('Tienes que rellenar los campos');//nos salta el alert
            return false;
    }
    /*if(email.value.trim() == ""){//comprobamos si el campo de texto esta relleno
        alert('Tienes que rellenar los campos');//nos salta el alert
        return false;//se detiene la ejecucion
    }*/
    
    /*tamaño = document.getElementsByName("tamaño");//optenemos todos los name de los radio-buttom
    var marcado = false;//ponemos marcado en falso por si en el caso de que salte la linea 25 se pueda ejecutar la linea 28
    for(var i=0; i<tamaño.length; i++){//vamos pasando por todos los elementos que tenemos en el radio-bttm
        if(tamaño[i].checked){//comprobamos si hay alguno marcado 
            marcado = true;//si esta marcado decimos q si y nos salimos
            break;
        }
    }
    if(!marcado){//en caso de que no este marcado como tenemos marcado en false entraria aqui
        alert('selecciona un tamaño de pizza');//y nos saltaria el alert
        return false;//ademas de detener la ejecucion
    }*/


    ingredientes = document.getElementsByName("ingredientes");//optenemos todos los name de los radio-buttom
    var selcted = false;//ponemos marcado en falso por si en el caso de que salte la linea 39 se pueda ejecutar la linea 42
    for(var i=0; i<ingredientes.length; i++){//vamos pasando por todos los elementos que tenemos en el radio-bttm
        if(ingredientes[i].checked){//comprobamos si hay alguno marcado 
            selcted = true;//si esta marcado decimos q si y nos salimos
            break;
        }
    }
    if(!selcted){//en caso de que no este marcado como tenemos marcado en false entraria aqui
        alert('selecciona un ingrediente de pizza');//y nos saltaria el alert
        return false;//ademas de detener la ejecucion
    }

    total = 0;//iniciamos a 0 el total 
    if(tamaño[0].checked){//comprobamos en todos los if si el dato esta seleccionado de ser asi 
        total += 5;//le sumamos a total el valor de ese dato
    }
    if(tamaño[1].checked){
        total += 10;
    }
    if(tamaño[2].checked){
        total += 15;
    }
    if(ingredientes[0].checked){
        total += 1;
    }
    if(ingredientes[1].checked){
        total += 1;
    }
    if(ingredientes[2].checked){
        total += 1;
    }
    if(ingredientes[3].checked){
        total += 1;
    }
    alert(total + "€")
    return true;
    
}
window.onload = function(){
    //pedido.onsubmit = validarform;//si la funcion validacion me retorna true, mando la 
    //información

    var elDiv = document.getElementById("pedido");
    //quitamos la funcion muestraMensaje del evento onClick
    elDiv.addEventListener("submit", validarform);
}