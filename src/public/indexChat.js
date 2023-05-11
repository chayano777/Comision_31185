const socket = io();
const body = document.getElementById('body');

const text_chat = document.getElementById('text_chat');
const msg = document.getElementById('msg');
const child = document.querySelector('#child')
const nodo = document.getElementById('nodo');

text_chat.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        socket.emit('chat', text_chat.value)
        text_chat.value='';
    }
})

socket.on('chat', (data)=>{
    body.scrollTop = body.scrollHeight;
    
    let child = '';

    data.forEach(msg =>{
        child +=        
        `<div class="d-flex flex-row justify-content-end mb-4">
                <div class="p-3 me-3 shadow-sm">
                    <p id="msg_chat" class="small mb-0">${msg.message}</p>
                </div>
        </div>`
    })
    nodo.innerHTML = child;
})
