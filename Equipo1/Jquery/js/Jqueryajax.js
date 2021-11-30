const URL_DESTINO = "http://localhost:5500/";
const DATOS = "pizza.json";

$(iniciar);

function iniciar() {
  AjaxUrl();
  $("#verPrecio").click(verPrecioPedido);
  $("#refrescar").click(AjaxUrl);

  function AjaxUrl() {
    $.ajax({
      type: "GET",
      url: URL_DESTINO + DATOS,
      async: true,
    })
      .done(RefresInfo)
      .fail(mostrarError);
  }

  function mostrarError() {
    swal({
      title: "Error!",
      text: "El nombre debe tener una letra en mayuscula y no se aceptan numeros!",
      icon: "error",
      button: "Ok",
    });
  }

  function RefresInfo(json) {
    var listaTAM = json.PIZZA.TAM;
    var listaING = json.PIZZA.ING;
    console.log(listaTAM);
    console.log(listaING);
    resetear();
    $("#tamapizza").html("");

    $.each(listaTAM, function (i, ele) {
      let input = $("<input>");
      let textInput = ele.TAMAÑO;

      input[0].type = "radio";
      input[0].className = "inputTam";
      input[0].name = "tamaño";
      input[0].id = `tamaño_${i.TAMAÑO}`;
      input[0].value = ele.TAMAÑO;
      input[0].precio = ele.PRECIO;

      tamapizza.append(input[0]);
      tamapizza.append(textInput);
    });

    $("#ingrepizza").html("");
    $.each(listaING, function (i, ele) {
      let input = $("<input>");
      let textInput = ele.INGREDIENTE;

      input[0].type = "checkbox";
      input[0].className = "inputIng";
      input[0].name = ele.INGREDIENTE;
      input[0].id = ele.INGREDIENTE;
      input[0].value = ele.INGREDIENTE;
      input[0].precio = ele.PRECIO;

      ingrepizza.append(input[0]);
      ingrepizza.append(textInput);
    });
  }

  function verPrecioPedido() {
    $("#parrafo").html("");
    let inputRadio = $("input[type=radio]:checked");
    let pizzaPrecio = 0;
    let inputCheckbox = $("input[type=checkbox]:checked");
    let ingredientePrecio = 0;
    let ingredientes = [];

    $.each(inputRadio, function (i, ele) {
      pizzaPrecio = inputRadio[0].precio;
    });

    $.each(inputCheckbox, function (i, ele) {
      ingredientePrecio += inputCheckbox[i].precio;
      let string = inputCheckbox[i].value;
      ingredientes.push(string);
    });

    let precioTotal = pizzaPrecio + ingredientePrecio;

    parrafo.append(
      `Tu pizza ${inputRadio[0].value} de ${ingredientes} te sale a un total de ${precioTotal}€.`
    );
  }

  function resetear() {
    $(`#parrafo`).html("");
  }
}
