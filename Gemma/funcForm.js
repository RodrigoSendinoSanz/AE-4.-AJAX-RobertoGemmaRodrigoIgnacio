//AJAX

const URL_DESTINO = "http://localhost:5500/";
const RECURSO = "detalles.json";

function peticionAsincrona() {

  let request = new XMLHttpRequest()

  request.onreadystatechange = function() {
      if (this.readyState == 4) {
          if (this.status == 200) {
              procesarRespuesta(this.responseText)//Obtenemos el valor en texto
          } else {
              alert("Algo fallo!")
          }
      }
  }

  request.open('GET', URL_DESTINO + RECURSO, true)
  request.send(null)
}

function procesarRespuesta(jsonDoc) {
  //Convertimos un texto a un objeto JSON
  var objetoJson = JSON.parse(jsonDoc);
  var TAMAÑO = objetoJson.PIZZA.TAMAÑO;
  var INGREDIENTES = objetoJson.PIZZA.INGREDIENTES;
    
      let doc = document.getElementsByName("TAMAÑO");
      let tam = "";
      for (let i = 0; i < doc.length; i++) {
        if (doc[i].checked) {
          tam = doc[i].value;
          break;
        }
      }
      var precioTAMAÑO = 0;
      for (let i of TAMAÑO) {
        if (tam === i.TAMAÑO) {
          precioTAMAÑO = i.PRECIO;
        }
      }
      var addINGREDIENTE = [];
      let seleccionado = document.getElementsByClassName("Seleccionado");
      for (let i = 0; i < seleccionado.length; i++) {
        if (seleccionado[i].checked) {
          addINGREDIENTE.push(seleccionado[i].value);
        }
      }
      var precioINGREDIENTE = 0;
      for (let i = 0; i < addINGREDIENTE.length; i++) {
        for (let ing of INGREDIENTES) {
          if (addINGREDIENTE[i] === ing.INGREDIENTE) {
            precioINGREDIENTE += ing.PRECIO;
          }
        }
      }
    
      var precioTotal = precioTAMAÑO  + precioINGREDIENTE;
      let Pedido = `Tu pizza tamaño ${TAMAÑO} con ${addINGREDIENTE} tiene un precio total de ${precioTotal}€.`;
      let mensaje = document.createTextNode(Pedido);
      parrafo.appendChild(mensaje);
    }
  
// funcion basica de validación de un formulario
function validacion() {
    console.log("validando los datos del formulario...");

    function precio() {
      let precio = 0;
      if (tamaño[0].checked) {
        precio += 5;
      } else if (tamaño[1].checked) {
        precio += 10;
      } else if (tamaño[2].checked) {
        precio += 15;
      }
      if (ingredientes[0].checked) {
        precio += 1;
      }
      if (ingredientes[1].checked) {
        precio += 1;
      }
      if (ingredientes[2].checked) {
        precio += 1;
      }
      if (ingredientes[3].checked) {
        precio += 1;
      }
      return precio;
    }

    if (!nombre.value.trim() == "") {
      console.log("Regex valido Nombre");
      regexnombre = /^[A-Z][A-z]+$/;
      if (!nombre.value.match(regexnombre)) {
          console.log(nombre.value.match(regexnombre));
          // Si no se cumple la condicion...
          swal({
            title: "Error!",
            text: "El nombre debe tener una letra en mayuscula y no se aceptan numeros!",
            icon: "error",
            button: "Ok",
          });
          return false;
        }
    }else{
      swal({
            title: "Error!",
            text: "El campo nombre debe estar relleno!",
            icon: "error",
            button: "Ok",
          });
            console.log("Error al validar Nombre");
            return false;
  }

    if (!direccion.value.trim() == "") {
      console.log("Regex valido Direccion");
       regexdirecion = /[A-Za-z0-9'\.\-\s\,]/;
      if (!direccion.value.match(regexdirecion)) {
          console.log(direccion.value.match(regexdirecion));
          // Si no se cumple la condicion...
          swal({
            title: "Error!",
            text: "El campo direccion es erroneo!",
            icon: "error",
            button: "Ok",
          });
          return false;
        }
    }else{
      swal({
            title: "Error!",
            text: "El campo direccion debe estar relleno!",
            icon: "error",
            button: "Ok",
          });
            console.log("Error al validar Direccion");
            return false;
  }

    if (!email.value.trim() == "") {
      console.log("Regex valido Email");
      regexemail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      if (!email.value.match(regexemail)) {
          console.log(email.value.match(regexemail));
          // Si no se cumple la condicion...
          swal({
            title: "Error!",
            text: "El email es erroneo!",
            icon: "error",
            button: "Ok",
          });
          return false;
        }
    }else{
      swal({
            title: "Error!",
            text: "El campo email debe estar relleno!",
            icon: "error",
            button: "Ok",
          });
            console.log("Error al validar Email");
            return false;
  }
        
    if (!telefono.value.trim() == "") {
      console.log("Regex valido Telefono");
      regextelefono = /(\+34|0034|34)?[-]*(6|7)[ -]*([0-9][ -]*){8}/
      if (!telefono.value.match(regextelefono)) {
          console.log(telefono.value.match(regextelefono));
          // Si no se cumple la condicion...
          swal({
            title: "Error!",
            text: "El telefono es erroneo!",
            icon: "error",
            button: "Ok",
          });
          return false;
        }
    }else{
      swal({
            title: "Error!",
            text: "El campo telefono debe estar relleno!",
            icon: "error",
            button: "Ok",
          });
            console.log("Error al validar Telefono");
            return false;
  }

    //Validando que se haya elegido alguna opción del radio
    //notese que seleccionamos por name ya que queremos todos
    //los radio button
    tamaño = document.getElementsByName("tamaño");
    var seleccionado = false;
    for (var i = 0; i < tamaño.length; i++) {
      if (tamaño[i].checked) {
        seleccionado = true;
        break;
      }
    }

    if (!seleccionado) {
      swal({
        title: "Error!",
        text: "Se debe selecionar un tamaño!",
        icon: "error",
        button: "Ok",
      });
      return false;
    }

    ingredientes = document.getElementsByName("ingredientes");
    var ingrsele = false;
    for (var i = 0; i < ingredientes.length; i++) {
      if (ingredientes[i].checked) {
        ingrsele = true;
        break;
      }
    }

    if (!ingrsele) {
      swal({
        title: "Error!",
        text: "Se debe selecionar al menos un ingrediente!",
        icon: "error",
        button: "Ok",
      });
      return false;
    }

    // Si el script ha llegado a este punto, todas las condiciones
    // se han cumplido, por lo que se devuelve el valor true
    // para que se propague el evento de mandar el formulario
    if (
      seleccionado &&
      ingrsele &&
      nombre.value.trim() != "" &&
      direccion.value.trim() != "" &&
      email.value.trim() != "" &&
      telefono.value.trim() != ""
    ) {
      swal({
        title: "Pedido aceptado!",
        text:
          "El pedido a nombre de " +
          nombre.value +
          " con el precio de " +
          precio() +
          " euros, se ha realizado correctamente!",
        icon: "success",
        button: "Ok",
      });
        return true;
    }
  }


  function cambiarTamano() {
    let queso = document.querySelector('input[value="queso"]');
    let bacon = document.querySelector('input[value="bacon"]');
    let tomate = document.querySelector('input[value="tomate"]');
    let pollo = document.querySelector('input[value="pollo"]');

    let pequeña = document.querySelector('input[value="pequeño"]');
    let mediana = document.querySelector('input[value="mediana"]');
    let grande = document.querySelector('input[value="grande"]');

    let pizza = document.querySelector(".pizza");
    if (pequeña.checked == true) {
      pizza.style.width = "300px";
      pizza.style.height = "300px";
      pizza.style.backgroundImage = 'url("./img/peque/todo.png")';
      queso.checked = false;
      bacon.checked = false;
      tomate.checked = false;
      pollo.checked = false;
    }
    if (mediana.checked == true) {
      pizza.style.width = "400px";
      pizza.style.height = "400px";
      pizza.style.backgroundImage = 'url("./img/mediana/todo.png")';
      queso.checked = false;
      bacon.checked = false;
      tomate.checked = false;
      pollo.checked = false;
    }
    if (grande.checked == true) {
      pizza.style.width = "500px";
      pizza.style.height = "500px";
      pizza.style.backgroundImage = 'url("./img/grande/todo.png")';
      queso.checked = false;
      bacon.checked = false;
      tomate.checked = false;
      pollo.checked = false;
    }
  }
  
  function eligeingrdientes() {
    let queso = document.querySelector('input[value="queso"]');
    let bacon = document.querySelector('input[value="bacon"]');
    let tomate = document.querySelector('input[value="tomate"]');
    let pollo = document.querySelector('input[value="pollo"]');

    let pequeña = document.querySelector('input[value="pequeño"]');
    let mediana = document.querySelector('input[value="mediana"]');
    let grande = document.querySelector('input[value="grande"]');

    let pizza = document.querySelector(".pizza");

    /* Grandes */
    if (queso.checked == true && grande.checked == true) {
      pizza.style.backgroundImage = 'url("./img/grande/pizzaqueso.png")';
    }
    if (bacon.checked == true && grande.checked == true) {
      pizza.style.backgroundImage = 'url("./img/grande/pizzabacon.png")';
    }
    if (tomate.checked == true && grande.checked == true) {
      pizza.style.backgroundImage = 'url("./img/grande/pizzatomate.png")';
    }
    if (pollo.checked == true && grande.checked == true) {
      pizza.style.backgroundImage = 'url("./img/grande/pizzapollo.png")';
    }

    if (
      queso.checked == true &&
      bacon.checked == true &&
      grande.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/grande/pizzabaconqueso.png")';
    }
    if (
      queso.checked == true &&
      tomate.checked == true &&
      grande.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/grande/pizzaquesotomate.png")';
    }
    if (
      queso.checked == true &&
      pollo.checked == true &&
      grande.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/grande/pizzaquesopollo.png")';
    }
    if (
      bacon.checked == true &&
      tomate.checked == true &&
      grande.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/grande/pizzabacontomate.png")';
    }
    if (
      bacon.checked == true &&
      pollo.checked == true &&
      grande.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/grande/pizzabaconpollo.png")';
    }
    if (
      tomate.checked == true &&
      pollo.checked == true &&
      grande.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/grande/pizzatomatepollo.png")';
    }
    if (
      queso.checked == true &&
      bacon.checked == true &&
      tomate.checked == true &&
      grande.checked == true
    ) {
      pizza.style.backgroundImage = 'url("./img/grande/todo.png")';
    }

    /* Medianas */
    if (queso.checked == true && mediana.checked == true) {
      pizza.style.backgroundImage = 'url("./img/mediana/pizzaqueso.png")';
    }
    if (bacon.checked == true && mediana.checked == true) {
      pizza.style.backgroundImage = 'url("./img/mediana/pizzabacon.png")';
    }
    if (tomate.checked == true && mediana.checked == true) {
      pizza.style.backgroundImage = 'url("./img/mediana/pizzatomate.png")';
    }
    if (pollo.checked == true && mediana.checked == true) {
      pizza.style.backgroundImage = 'url("./img/mediana/pizzapollo.png")';
    }

    if (
      queso.checked == true &&
      bacon.checked == true &&
      mediana.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/mediana/pizzabaconqueso.png")';
    }
    if (
      queso.checked == true &&
      tomate.checked == true &&
      mediana.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/mediana/pizzaquesotomate.png")';
    }
    if (
      queso.checked == true &&
      pollo.checked == true &&
      mediana.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/mediana/pizzaquesopollo.png")';
    }
    if (
      bacon.checked == true &&
      tomate.checked == true &&
      mediana.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/mediana/pizzabacontomate.png")';
    }
    if (
      bacon.checked == true &&
      pollo.checked == true &&
      mediana.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/mediana/pizzabaconpollo.png")';
    }
    if (
      tomate.checked == true &&
      pollo.checked == true &&
      mediana.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/mediana/pizzatomatepollo.png")';
    }
    if (
      queso.checked == true &&
      bacon.checked == true &&
      tomate.checked == true &&
      mediana.checked == true
    ) {
      pizza.style.backgroundImage = 'url("./img/mediana/todo.png")';
    }

    /* Peque */

    if (queso.checked == true && pequeña.checked == true) {
      pizza.style.backgroundImage = 'url("./img/peque/pizzaqueso.png")';
    }
    if (bacon.checked == true && pequeña.checked == true) {
      pizza.style.backgroundImage = 'url("./img/peque/pizzabacon.png")';
    }
    if (tomate.checked == true && pequeña.checked == true) {
      pizza.style.backgroundImage = 'url("./img/peque/pizzatomate.png")';
    }
    if (pollo.checked == true && pequeña.checked == true) {
      pizza.style.backgroundImage = 'url("./img/peque/pizzapollo.png")';
    }

    if (
      queso.checked == true &&
      bacon.checked == true &&
      pequeña.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/peque/pizzabaconqueso.png")';
    }
    if (
      queso.checked == true &&
      tomate.checked == true &&
      pequeña.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/peque/pizzaquesotomate.png")';
    }
    if (
      queso.checked == true &&
      pollo.checked == true &&
      pequeña.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/peque/pizzaquesopollo.png")';
    }
    if (
      bacon.checked == true &&
      tomate.checked == true &&
      pequeña.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/peque/pizzabacontomate.png")';
    }
    if (
      bacon.checked == true &&
      pollo.checked == true &&
      pequeña.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/peque/pizzabaconpollo.png")';
    }
    if (
      tomate.checked == true &&
      pollo.checked == true &&
      pequeña.checked == true
    ) {
      pizza.style.backgroundImage =
        'url("./img/peque/pizzatomatepollo.png")';
    }
    if (
      queso.checked == true &&
      bacon.checked == true &&
      tomate.checked == true &&
      pequeña.checked == true
    ) {
      pizza.style.backgroundImage = 'url("./img/peque/todo.png")';
    }
  }

  window.onload = function () {
    verPrecio.addEventListener("click", function () {
        let precio = "precio";
        parrafo.innerHTML = "";
        peticionAsincrona(precio);
      })

  }