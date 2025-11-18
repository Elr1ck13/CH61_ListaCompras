const txtname = document.getElementById("Name");
const txtnumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidacionesTexto = document.getElementById(
  "alertValidacionesTexto"
);
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let totalEnProductos = 0;
let cont = 0;
let costoTotal = 0;
let row = [];
let datos = [];

function validarCantidad(cantidad) {
  return cantidad.length == 0 || isNaN(cantidad) || Number(cantidad) < 0
    ? false
    : true;
}
function getPrecio() {
  return Math.round(Math.random() * 1000) / 100;
}
function errorClean() {
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtname.style.border = "";
  txtnumber.style.border = "";
}

function errorChange(msg) {
  alertValidacionesTexto.innerHTML += "<br><strong>" + msg + "<strong>";
  alertValidaciones.style.display = "block";
}

function createRows(element) {
  let row = `<tr>`;
  for (const [key, value] of Object.entries(element)) {
    row += `<td>${value}</td>`;
  }
  row += `<tr>`;
  return row;
}

function resumenData(data) {
  contadorProductos.innerText = data[0];
  productosTotal.innerText = data[1];
  precioTotal.innerText = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(data[2]);
}

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  errorClean();
  let isValid = true;

  if (txtname.value.length < 3) {
    errorChange("El nombre del producto no es correcto");
    txtname.style.border = "solid thin red";
    isValid = false;
  }
  if (!validarCantidad(txtnumber.value)) {
    errorChange("La cantidad no es correcta");
    txtnumber.style.border = "solid thin red";
    isValid = false;
  }
  if (isValid) {
    let precio = getPrecio();
    cont++;
    let elemento = {
      "cont": cont,
      "nombre": txtname.value,
      "cantidad": txtnumber.value,
      " precio": precio,
    };

    datos.push(elemento);
    localStorage.setItem("datos", JSON.stringify(datos));
    totalEnProductos += Number(txtnumber.value);
    costoTotal += precio * Number(txtnumber.value);
    cuerpoTabla.insertAdjacentHTML("beforeend", createRows(elemento));

    resumenData([cont, totalEnProductos, costoTotal]);

    txtname.value = "";
    txtnumber.value = "";
    txtname.focus();
  }

  let resumen = {
    cont: cont,
    totalEnProductos: totalEnProductos,
    costoTotal: costoTotal,
  };

  localStorage.setItem("resumen", JSON.stringify(resumen));
});

window.addEventListener("load", function (event) {
  event.preventDefault();
  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
    datos.forEach((elemento) => {
      cuerpoTabla.insertAdjacentHTML("beforeend", createRows(elemento));
    });
  }

  if (this.localStorage.getItem("resumen") != null) {
    let resumen = JSON.parse(this.localStorage.getItem("resumen"));
    cont = resumen.cont;
    totalEnProductos = resumen.totalEnProductos;
    costoTotal = resumen.costoTotal;
  }
  resumenData([cont, totalEnProductos, costoTotal]);
});

btnClear.addEventListener("click", function (event) {
  errorClean();
  txtname.style.border = "";
  txtnumber.style.border = "";
  localStorage.removeItem("resumen");
  localStorage.removeItem("datos");
  resumenData([0, 0, 0]);

  while (cuerpoTabla.firstChild) {
    cuerpoTabla.removeChild(cuerpoTabla.firstChild);
  }
});
