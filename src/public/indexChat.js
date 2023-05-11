const socket = io();
const body = document.getElementById('body');

const text_chat = document.getElementById('text_chat');
const msg = document.getElementById('msg');
const child = document.querySelector('#child')

text_chat.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        socket.emit('chat', text_chat.value)
        text_chat.value='';
    }
})

socket.on('chat', (data)=>{
    body.scrollTop = body.scrollHeight;
    const nodo = document.getElementById('nodo');
    
    let child = '';

    data.forEach(msg =>{
        `<div class="d-flex flex-row justify-content-end mb-4">
                <div class="p-3 me-3 shadow-sm" style="border-radius: 15px; background-color: #d1f5e8;">
                    <p id="msg_ext" class="small mb-0">${msg.message}</p>
                </div>
        </div>`
    })
    nodo.innerHTML = child;
})
