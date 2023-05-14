const socket = io();

const nodo = document.querySelector('#nodo')
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const stock = document.querySelector('#stock')
const thumbnail = document.querySelector('#thumbnail')
const description = document.querySelector('#description')
const category = document.querySelector('#category')
const code = document.querySelector('#code')
const agregar = document.querySelector('#agregar')
const borrar = document.querySelector('#borrar')
const idProd = document.querySelector('#id')
const hijo = document.querySelector('#hijo')
const estatus = document.querySelector('#status');
const form = document.querySelector('#primeForm')

socket.on('log', products => {
    
    let hijo = '';

    products.forEach(e => {
        hijo += `
        <ul id="${e.pid}" class="list-group mb-5"> 
        <li class="list-group-item">ID: ${e.pid}</li>
        <li class="list-group-item"><h3>${e.title}</h3></li>
        <li class="list-group-item">Codigo: ${e.code}</li>
        <li class="list-group-item">Precio: $ ${e.price}</li> 
        <li class="list-group-item">Descripcion: ${e.description}</li> 
        </ul>
        `
    });
    nodo.innerHTML = hijo;
});

socket.on('alerta', (data) => { 
    console.log(data)
    switch (data.status) {
        case 'noexiste':
            swal ( "Oops" , "Producto inexistente" ,  "error" )
            break;
        case 'exito':
            swal ( "OKEY" , "Producto cargado de forma correcta" ,  "success" )
            break;
        case 'sindatos':
            swal("Oops", "Datos incompletos", "error")
            break;
       }
});


agregar.addEventListener('click', ()=>{
    event.preventDefault();
    socket.emit('add_product', {
        title: title.value,
        price: price.value,
        stock: stock.value,
        thumbnail: thumbnail.value,
        status: estatus.checked,
        description: description.value,
        category: category.value,
        code: code.value
    });

    form.reset()
});


borrar.addEventListener('click', ()=>{
    event.preventDefault();
    socket.emit('del_product', {
        pid: idProd.value
    })
})
