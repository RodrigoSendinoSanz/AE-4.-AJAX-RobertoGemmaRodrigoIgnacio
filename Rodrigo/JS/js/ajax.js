const URL_DESTINO = "http://localhost:5500/"; 
const DATOS = "pizza.json";

function miFuncionAsync(str) {
  let pagina = new XMLHttpRequest();

  pagina.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (str === "mostrar") {
          mostrarDatos(this.responseText);
        } else if (str === "procesar") {
          sacarPedido(this.responseText);
        }
      } else {
        alert("ERROR");
      }
    }
  };
  pagina.open("GET", URL_DESTINO + DATOS, true);
  pagina.send(null);
}


function sacarPedido(jsonDoc) {
  var json = JSON.parse(jsonDoc);
  var listaTAM = json.PIZZA.TAM;
  var listaING = json.PIZZA.ING;


  let size = document.getElementsByName("tamaño");
  let tamano = ""; 
  for (let i = 0; i < size.length; i++) {
   
    console.log(size[i].value);
    if (size[i].checked) {
    
      tamano = size[i].value; 
      break;
    }
  }
  var precioTam = 0;
  for (let i of listaTAM) {
    console.log(i.TAMAÑO +" "+ i.PRECIO);
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
  console.log(precioTam);
  console.log(precioIngre);
  
  var precioFinal = precioTam + precioIngre; 
  let tuPedido = `Tu pizza tamaño ${tamano} con ${addIngre} tiene un precio total de ${precioFinal}€.`;
  let mensaje = document.createTextNode(tuPedido); 
  parrafo.appendChild(mensaje); 
  console.log(precioFinal);
}






function mostrarDatos(jsonDoc) {
  var json = JSON.parse(jsonDoc); 

  var listaTAM = json.PIZZA.TAM;
  var listaING = json.PIZZA.ING;


  var inputRad = [];
  var inputTxtRad = [];

  for (let i of listaTAM) {
    inputRad[i] = document.createElement("input");
    inputRad[i].type = "radio";
    inputRad[i].className = "inputRadio";
    inputRad[i].name = "tamaño";
    inputRad[i].id = `tamaño_${i.TAMAÑO}`;
    inputRad[i].value = i.TAMAÑO;

    inputTxtRad[i] = document.createTextNode(i.TAMAÑO);

    tamapizza.appendChild(inputRad[i]);
    tamapizza.appendChild(inputTxtRad[i]);
  }

  var inputCheck = [];
  var inputTxtChecks = [];

  for (let i of listaING) {
    inputCheck[i] = document.createElement("input");
    inputCheck[i].type = "checkbox";
    inputCheck[i].className = "inputCheck";
    inputCheck[i].name = "ingredientes";
    inputCheck[i].id = i.INGREDIENTE;
    inputCheck[i].value = i.INGREDIENTE;

    inputTxtChecks[i] = document.createTextNode(i.INGREDIENTE);

    ingrepizza.appendChild(inputCheck[i]);
    ingrepizza.appendChild(inputTxtChecks[i]);
  }
}

function animationpizza() {
  document.getElementsByClassName("inputRadio").onclick = cambiarTamano();
  document.getElementsByClassName("inputCheck").onclick = eligeingrdientes(); 
}



window.onload = function () {

  animationpizza();

refrescar.addEventListener("click", function () {
  let mostrar = "mostrar";
  tamapizza.innerHTML = "";
  ingrepizza.innerHTML = "";
  miFuncionAsync(mostrar);
});

  sacarPrecio.addEventListener("click", function () {
    let procesar = "procesar";
    parrafo.innerHTML = "";
    miFuncionAsync(procesar);
  });
};


