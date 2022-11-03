
// const lblOnline = document.querySelector('#lblOnline')
// const lblOffline = document.querySelector('#lblOffline')
// const txtMensaje = document.querySelector('#txtMensaje')
// const btnEnviar = document.querySelector('#btnEnviar')
const video = document.querySelector('#video')
const play = document.querySelector('#play')
const pause = document.querySelector('#pause')
const back = document.querySelector('#back')
const foward = document.querySelector('#foward')
const value = 10;


const socket = io();

socket.on('connect', () => {
    console.log('conectado');
    // lblOffline.style.display = 'none';
    // lblOnline.style.display = '';
})

socket.on('disconnect', () => {
    console.log('desconectado del servidor');
    // lblOnline.style.display = 'none';
    // lblOffline.style.display = '';
})

socket.on('enviar-mensaje', (payload) => {
    if (payload.mensaje === "play") {
        video.play();
    } else if (payload.mensaje === "pause") {
        video.pause();
    } else {
        if (video.currentTime === payload.mensaje) {
        } else {
            video.currentTime = payload.mensaje + 0.1
            // video.play()
        }
    }
})
// btnEnviar.addEventListener('click',()=>{
//     const mensaje = txtMensaje.value
//     const payload = {
//         mensaje,
//         id: "123ABC",
//         fecha: new Date().getTime()

//     }
//     socket.emit('enviar-mensaje',payload)

// })
video.addEventListener('play', () => {
    const mensaje = "play";
    const payload = {
        mensaje
    }
    socket.emit('enviar-mensaje', payload)
})
video.addEventListener('pause', () => {
    const mensaje = "pause";
    const payload = {
        mensaje
    }

    socket.emit('enviar-mensaje', payload)
})
video.addEventListener('seeked', () => {
    console.log(video.currentTime)
    const mensaje = video.currentTime
    const payload = {
        mensaje
    }
    socket.emit('enviar-mensaje', payload)
})

/// Buttons Events
play.addEventListener('click',()=>{
    video.play()
})
pause.addEventListener('click',()=>{
    video.pause()
})
back.addEventListener('click',()=>{
    video.currentTime += (value * -1);
})
foward.addEventListener('click',()=>{
    video.currentTime +=value;
})
