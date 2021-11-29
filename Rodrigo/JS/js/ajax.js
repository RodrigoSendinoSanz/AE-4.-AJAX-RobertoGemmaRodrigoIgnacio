const URL_DESTINO = "http://localhost:5500/";
const DATOS = "pizza.json";

function FuncionAsync(str) {
  let pagina = new XMLHttpRequest();

  pagina.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (str === "borrar") {
          RefresInfo(this.responseText);
        } else if (str === "precio") {
          verPrecioPedido(this.responseText);
        }
      } else {
        swal({
          title: "Error!",
          text: "El nombre debe tener una letra en mayuscula y no se aceptan numeros!",
          icon: "error",
          button: "Ok",
        });
      }
    }
  };
  pagina.open("GET", URL_DESTINO + DATOS, true);
  pagina.send(null);
}

function verPrecioPedido(jsonDoc) {
  var json = JSON.parse(jsonDoc);
  var listaTAM = json.PIZZA.TAM;
  var listaING = json.PIZZA.ING;

  let size = document.getElementsByName("tamaño");
  let tamano = "";
  for (let i = 0; i < size.length; i++) {
    if (size[i].checked) {
      tamano = size[i].value;
      break;
    }
  }
  var precioTam = 0;
  for (let i of listaTAM) {
    if (tamano === i.TAMAÑO) {
      precioTam = i.PRECIO;
    }
  }
  var addIngre = [];
  let checks = document.getElementsByClassName("inputCheck");
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      addIngre.push(checks[i].value);
    }
  }
  var precioIngre = 0;
  for (let i = 0; i < addIngre.length; i++) {
    for (let j of listaING) {
      if (addIngre[i] === j.INGREDIENTE) {
        precioIngre += j.PRECIO;
      }
    }
  }

  var precioTotal = precioTam + precioIngre;
  let tuPedido = `Tu pizza tamaño ${tamano} con ${addIngre} tiene un precio total de ${precioTotal}€.`;
  let mensaje = document.createTextNode(tuPedido);
  parrafo.appendChild(mensaje);
}

function RefresInfo(jsonDoc) {
  var json = JSON.parse(jsonDoc);

  var listaTAM = json.PIZZA.TAM;
  var listaING = json.PIZZA.ING;

  var inputTam = [];
  var inputConTam = [];

  for (let i of listaTAM) {
    inputTam[i] = document.createElement("input");
    inputTam[i].type = "radio";
    inputTam[i].className = "inputTam";
    inputTam[i].name = "tamaño";
    inputTam[i].id = `tamaño_${i.TAMAÑO}`;
    inputTam[i].value = i.TAMAÑO;

    inputConTam[i] = document.createTextNode(i.TAMAÑO);

    tamapizza.appendChild(inputTam[i]);
    tamapizza.appendChild(inputConTam[i]);
  }

  var inputIng = [];
  var inputTxtIng = [];

  for (let i of listaING) {
    inputIng[i] = document.createElement("input");
    inputIng[i].type = "checkbox";
    inputIng[i].className = "inputIng";
    inputIng[i].name = "ingredientes";
    inputIng[i].id = i.INGREDIENTE;
    inputIng[i].value = i.INGREDIENTE;

    inputTxtIng[i] = document.createTextNode(i.INGREDIENTE);

    ingrepizza.appendChild(inputIng[i]);
    ingrepizza.appendChild(inputTxtIng[i]);
  }
  console.log("Referencias refrescadas");
}

window.onload = function () {
  verPrecio.addEventListener("click", function () {
    let precio = "precio";
    parrafo.innerHTML = "";
    FuncionAsync(precio);
  });

  refrescar.addEventListener("click", function () {
    let borrar = "borrar";
    tamapizza.innerHTML = "";
    ingrepizza.innerHTML = "";
    FuncionAsync(borrar);
  });
};
