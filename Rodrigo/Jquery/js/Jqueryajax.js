const URL_DESTINO = "http://localhost:5500/"; 
const DATOS = "pizza.json";

$(iniciar);

function iniciar() {
  AjaxUrl();
  $("#sacarPrecio").click(procesarPedido); //sacar precio al pulsar procesar pedido
  $("#reset").click(resetear); //borrar parametro y empezar de cero
  $("#refrescar").click(AjaxUrl); //refrescar página
}




function AjaxUrl(){
  $.ajax({
      'type': 'GET', //o POST, DELETE, PUT
      'url': URL_DESTINO + DATOS,  //DATOS = http://localhost:5500/pizza.json
      'async': true //PUEDE BORRAR AL NO PERMITIR SINCRONO
  })
  .done(mostrarDatos)
  .fail(procesarError);
}


function procesarError(){
  alert('ERROR')
}

function mostrarDatos(json){
  var listaTAM = json.PIZZA.TAM;
  var listaING = json.PIZZA.ING;
  console.log(listaTAM)
  console.log(listaING)
  resetear();
  $("#tamapizza").html(""); //vaciamos el HTML dentro del <DIV id="tam">

  //Creamos un for para poner los input con su texto del tamaño de la pizza
  $.each(listaTAM,function(i, ele){
      let input = $('<input>');
      let textInput = ele.TAMAÑO;
      //usamos la posicion 0 siempre del array
      input[0].type="radio";
      input[0].className = "inputRadio";
      input[0].name = "tamaño";
      input[0].id =  `tamaño_${i.TAMAÑO}`; //alternativa concatenamos String + JSON "size_" + ele.TAM
      input[0].value = ele.TAMAÑO;
      input[0].precio = ele.PRECIO; //creamos un atributo de precio ..no es muy limpio pero funciona
      //metemos los textos de las etiquetas
      tamapizza.append(input[0]); //Etiqueta input con sus atributos
      tamapizza.append(textInput); //el texto entre las etiquetas <input>
  })
//Creamos un for para poner los input con su texto de los ingredientes de las pizzas
  $("#ingrepizza").html("");
  $.each(listaING, function(i,ele){
      let input = $('<input>');
      let textInput = ele.INGREDIENTE;

      input[0].type="checkbox";
      input[0].className="inputCheck";
      input[0].name = ele.INGREDIENTE;
      input[0].id = ele.INGREDIENTE;
      input[0].value = ele.INGREDIENTE;
      input[0].precio = ele.PRECIO; //creamos un atributo de precio para cada ingrediente

      ingrepizza.append(input[0]); //escribimos <input type="checkbox"......value=" York">
      ingrepizza.append(textInput); //escribimos el Nombre ingrediente
  })
}
//creamos funcion para meter texto debajo del <form> para sacar 
//las casracteristicas selecionadas en los input
  function procesarPedido(){
      $("#parrafo").html("");
      let inputRadio = $("input[type=radio]:checked");
      let pizzaPrecio = 0;
      let inputCheckbox = $("input[type=checkbox]:checked");
      let ingredientePrecio = 0;
      let ingredientes = [];
//recorremos con el for el precio de las pizzas y la añadimos a un array
      $.each(inputRadio, function(i, ele){
          pizzaPrecio=inputRadio[0].precio;
      });
//recorremos con for el precio e ingrediente de los ingredientes
      $.each(inputCheckbox, function(i, ele){
          ingredientePrecio += inputCheckbox[i].precio;//sumamos los precios para el total
          //creamos variable string con (ingrediente+precio+€)
          let string=inputCheckbox[i].value;
          ingredientes.push(string); //pasamos el array al string
      });
//vamos con el paso de sumar todos los precios y dar un total
      let precioTotal=pizzaPrecio+ingredientePrecio; //variable con el total
//insertamos en un <p> el texto con la frase de todos los datos a sacar       
      parrafo.append(`Tu pizza ${inputRadio[0].value} de ${ingredientes} te sale a un total de ${precioTotal}€.`);
  }
//funcion para borrar el parrafo de la linea 188 para no duplicar resultados
  function resetear(){
      $(`#parrafo`).html("");
  }

