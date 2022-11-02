
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')
const video = document.querySelector('#video')


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

socket.on('enviar-mensaje',(payload)=>{
    console.log(payload)
    if ( payload.mensaje === "play"){
        video.play();
    } else {
        video.pause();
    }
})
btnEnviar.addEventListener('click',()=>{
    const mensaje = txtMensaje.value
    const payload = {
        mensaje,
        id: "123ABC",
        fecha: new Date().getTime()

    }
    socket.emit('enviar-mensaje',payload)

})

video.addEventListener('play', () => {
    const mensaje = "play";
    const payload = {
        mensaje
    }
    socket.emit('enviar-mensaje',payload)
})
video.addEventListener('pause', () => {
    const mensaje = "pause";
    const payload = {
        mensaje
    }

    socket.emit('enviar-mensaje',payload)
})