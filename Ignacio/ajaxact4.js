const URL_DESTINO ="http://localhost:5500/";
const RECURSO = "datos.json";

function funcionasyncrona(a){
    let asd = XMLHttpRequest();

    asd.onreadystatechange = function(){
        if (this.readyState == 4) {
            if (this.status == 200) {
                if(a === "precio"){
                    verprecio(this.responseText);
                }
            }
        }
    }
    asd.open("GET", URL_DESTINO + DATOS, true);
    asd.send(null);
}
    function verprecio(datos){
    var js = JSON.parse(datos);
    var ingrediente = js.pizza.ingredientes;
    var tamaño = js.pizza.tamaño;

    tamañoo = document.getElementsByName("tamaño");//optenemos todos los name de los radio-buttom
    selec = [];
    var marcado = false;//ponemos marcado en falso por si en el caso de que salte la linea 25 se pueda ejecutar la linea 28
    for(var i=0; i<tamañoo.length; i++){//vamos pasando por todos los elementos que tenemos en el radio-bttm
        if(tamañoo[i].checked){//comprobamos si hay alguno marcado 
            selec = tamañoo[i].value;
            marcado = true;//si esta marcado decimos q si y nos salimos
            break;
        }
    }
    if(!marcado){//en caso de que no este marcado como tenemos marcado en false entraria aqui
        alert('selecciona un tamaño de pizza');//y nos saltaria el alert
        return false;//ademas de detener la ejecucion
    }
    preciotamaño = 0;
    for(a of tamaño){
        if(selec == a.tamaño){
        preciotamaño += a.precio;
        }
    }

    ingredientee = document.getElementsByName("ingredientes");//optenemos todos los name de los radio-buttom
    selec = [];
    var marcadoin = false;//ponemos marcado en falso por si en el caso de que salte la linea 25 se pueda ejecutar la linea 28
    for(var i=0; i<ingredientee.length; i++){//vamos pasando por todos los elementos que tenemos en el radio-bttm
        if(ingredientee[i].checked){//comprobamos si hay alguno marcado 
            selec = ingredientee[i].value;
            marcadoin = true;//si esta marcado decimos q si y nos salimos
            break;
        }
    }
    if(!marcadoin){//en caso de que no este marcado como tenemos marcado en false entraria aqui
        alert('selecciona un tamaño de pizza');//y nos saltaria el alert
        return false;//ademas de detener la ejecucion
    }
    precioingrediente = 0;
    for(a of ingrediente){
        if(selec == a.ingrediente){
            ingrediente += a.precio;
        }
    }

    totalPrecio = preciotamaño + precioingrediente;
    sol = '${preciotamaño} tamaño || ${precioingrediente} ingrediente'
    texto = document.createTextNode(sol);
    textoo.appendChild(texto);
    console.log("a   "+texto);
    }

    /*function refrescar(datos){
        var js = JSON.parse(datos);
        var ingrediente = js.pizza.ingredientes;
        var tamaño = js.pizza.tamaño;
    }*/

    window.onload = function() {
        var elDiv = document.getElementById("pedido");
        elDiv.addEventListener("click", function() {
            let precio = "precio";
            textoo.innerHTML = "";
            funcionasyncrona(precio);
        })
        
    }


