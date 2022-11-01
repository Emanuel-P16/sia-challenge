
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')


const socket = io();

socket.on('connect', ()=>{
    console.log('conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect', ()=>{
    console.log('desconectado del servidor');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})