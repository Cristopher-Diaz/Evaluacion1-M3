// Evaluación 1 del módulo 3 por Cristopher Díaz y Rodrigo González

// API con listado oficial de las regiones de Chile
const urlRegiones = "https://apis.digital.gob.cl/dpa/regiones";

const regiones = document.getElementById("regiones");
const rutInput = document.getElementById('rut');
const nombreInput = document.getElementById('nombre');
const fechaInput = document.getElementById('fecha');
const regionInput = document.getElementById('regiones');
const precioInput = document.getElementById('precio');
const agregar = document.getElementById('agregar');
const tablaBody = document.getElementById('tablaBody');
const cardCantidad = document.getElementById('numeroVentas');
const cardTotal = document.getElementById('totalVentas');
const modal = new bootstrap.Modal(document.getElementById("modal"), {});
const modalBody = document.getElementById('modalBody');
const formu = document.getElementById('formu');

agregar.addEventListener('click',crearVenta)

let misVentas = [];
let numeroVentas = 0;
let totalVentas = 0;

function Venta() {
    this.rut = "";
    this.nombre = "";
    this.fecha = new Date();
    this.region = "";
    this.precio = 0;
}

function agregarRegionesAjax() {
    var xhr= new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status==200){
                    let listaRegiones=JSON.parse(xhr.responseText);
                    let nombresRegiones = '<option value="" disabled selected>Elija una región</option>';
                    for (let i=0; i < listaRegiones.length; i++) {
                        nombresRegiones += '<option value="'+listaRegiones[i].nombre+'">';
                        nombresRegiones += listaRegiones[i].codigo+' '+listaRegiones[i].nombre+'</option>';
                    }
                    regiones.innerHTML = nombresRegiones;
                }
            }
            xhr.open("get",urlRegiones);
            xhr.send();
}

function crearVenta() {
    let ventas = new Venta();
    ventas.rut = rutInput.value;
    ventas.nombre = nombreInput.value;
    ventas.fecha = fechaInput.value;
    ventas.region = regionInput.value;
    ventas.precio = precioInput.value;

    if (validaciones(ventas))  {
        agregarVentas(ventas);
    }
}

function agregarVentas(ventas) {
    misVentas.push(ventas);
    imprimirVentas();
    formu.reset();
    console.log('dentro de agregarVentas');
}

function imprimirVentas() {
    let contenidoTabla = '';
    for (let i=0; i < misVentas.length; i++) {
        contenidoTabla += '<tr><td>'+1*(i+1)+'</td>';
        contenidoTabla += '<td>'+misVentas[i].nombre+'</td>';
        contenidoTabla += '<td>'+misVentas[i].rut+'</td>';
        contenidoTabla += '<td>'+misVentas[i].fecha+'</td>';
        contenidoTabla += '<td>'+misVentas[i].region+'</td></tr>';
    }
    tablaBody.innerHTML = contenidoTabla;
    cardCantidad.innerHTML = contarVentas(misVentas);
    cardTotal.innerHTML = sumarVentas(misVentas);
}

function sumarVentas(misVentas) {
    let sumaTotal = 0;
    for (let i=0; i < misVentas.length; i++) {
        sumaTotal += misVentas[i].precio*1;
    }
    return sumaTotal;
}

function contarVentas() {
    return misVentas.length;
}

function validaciones(ventas) {
    if ( ventas.precio < 0 || ventas.precio == "" || isNaN(ventas.precio)) {
        modalBody.innerHTML = 'El precio debe ser un número mayor o igual a cero';
        modal.show();
        return false;
    } else if (ventas.rut == "" || ventas.nombre == "" || ventas.fecha == "" || ventas.region == "" || ventas.precio == "") {
        modalBody.innerHTML = 'Todos los campos son obligatorios';
        modal.show();
        return false;
    }
    else {
        return true;
    }
}

agregarRegionesAjax();