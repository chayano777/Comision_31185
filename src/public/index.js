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
const form = document.querySelector('#primeForm')

socket.on('log', products => {
    
    let hijo = '';

    products.forEach(e => {
        hijo += `
            <ul id="${e.id}" class="list-group mb-5"> 
                <li class="list-group-item">ID: ${e.id}</li>
                <li class="list-group-item"><h3>${e.title}</h3></li>
                <li class="list-group-item">Codigo: ${e.code}</li>
                <li class="list-group-item">Precio: $ ${e.price}</li> 
                <li class="list-group-item">Descripcion: ${e.description}</li> 
            </ul>
        `;
        nodo.innerHTML = hijo;
    });
});

agregar.addEventListener('click', ()=>{
    socket.emit('add_product', {
        title: title.value,
        price: price.value,
        stock: stock.value,
        thumbnail: thumbnail.value,
        description: category.value,
        code: code.value
    });
});



borrar.addEventListener('click', ()=>{
    socket.emit('del_product', {
        id: idProd.value
    })
})


                        
//socket.emit('mensaje', "Hola yo soy el cliente");
