const txtname = document.getElementById("Name");
const txtnumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0)
let totalEnProductos = 0;
let cont = 0;
let costoTotal = 0;

function validarCantidad(cantidad) {
  return (cantidad.length == 0 || isNaN(cantidad) || Number(cantidad) < 0) ?  false:true;
}
function getPrecio(){
    return Math.round(Math.random() * 1000)/100;
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
btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  errorClean();
  let isValid = true;

  if (txtname.value.length < 3) {
    errorChange( "El nombre del producto no es correcto");
    txtname.style.border = "solid thin red";
    isValid = false;
 }
  if (!validarCantidad(txtnumber.value)) {
    errorChange( "La cantidad no es correcta");
    txtnumber.style.border = "solid thin red";
    isValid = false;
}
if (isValid) {

    let precio = getPrecio();
    cont++;
    let row = `<tr>
        <td>${cont}</td>
        <td>${txtname.value}</td>
        <td>${txtnumber.value}</td>
        <td>${precio}</td>
      </tr>
    `;
    
    console.log(precio);
    totalEnProductos += Number(txtnumber.value);
    costoTotal += precio * Number(txtnumber.value);
    
    cuerpoTabla.insertAdjacentHTML("beforeend",row);
    
    contadorProductos.innerText = cont
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX", 
      { style: "currency", currency: "MXN" }).format(costoTotal);
      txtname.value="";
      txtname.value="";
      txtname.focus();
    }
});
