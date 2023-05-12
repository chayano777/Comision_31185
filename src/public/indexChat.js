const socket = io();

const text_chat = document.querySelector('#text_chat');
const nodo = document.querySelector('#nodo');

text_chat.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        socket.emit('chat', {user: user.value, message: text_chat.value})
        text_chat.value='';
    }
})

socket.on('chat', (data)=>{
    
    let child = '';

    data.forEach(msg =>{
        child +=        
        `<div class="d-flex flex-row justify-content-end mb-4">
                <div class="p-3 me-3 shadow-sm">
                    <p id="msg_chat" class="small mb-0">Usuario: ${msg.user}</p>
                    <p id="msg_chat" class="small mb-0">${msg.message}</p>
                </div>
        </div>`
    })
    nodo.innerHTML = child;
})
