
const video = document.querySelector('#video')
const play = document.querySelector('#play')
const pause = document.querySelector('#pause')
const back = document.querySelector('#back')
const foward = document.querySelector('#foward')
const value = 10;
let lastSeekServer = null;


const socket = io();

socket.on('connect', () => {
})

socket.on('disconnect', () => {
})

socket.on('enviar-mensaje', (payload) => {
    if (payload.mensaje === "play") {
        video.play();
    } else if (payload.mensaje === "pause") {
        video.pause();
    }
})
socket.on('seeked',(payload)=>{
    lastSeekServer = payload.mensaje
    video.currentTime = lastSeekServer
})
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

video.addEventListener('seeked', (e) => {
    e.preventDefault()

    const mensaje = video.currentTime | 0
    const payload = {
        mensaje
    }
    if (payload.mensaje !== lastSeekServer) {
        socket.emit('seeked',payload)
    }
})

/// Buttons Events
play.addEventListener('click', () => {
    video.play()
})
pause.addEventListener('click', () => {
    video.pause()
})
back.addEventListener('click', () => {
    video.currentTime += (value * -1);
    const mensaje = video.currentTime | 0
    const payload = {
        mensaje
    }
    socket.emit('seeked', payload)

})
foward.addEventListener('click', () => {
    video.currentTime += value;
    const mensaje = video.currentTime | 0
    const payload = {
        mensaje
    }
    socket.emit('seeked', payload)
})
