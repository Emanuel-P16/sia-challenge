'use strict';

// const lblOnline = document.querySelector('#lblOnline')
// const lblOffline = document.querySelector('#lblOffline')
// const txtMensaje = document.querySelector('#txtMensaje')
// const btnEnviar = document.querySelector('#btnEnviar')
var video = document.querySelector('#video');
var play = document.querySelector('#play');
var pause = document.querySelector('#pause');
var back = document.querySelector('#back');
var foward = document.querySelector('#foward');
var value = 10;

var socket = io();

socket.on('connect', function () {
    console.log('conectado');
    // lblOffline.style.display = 'none';
    // lblOnline.style.display = '';
});

socket.on('disconnect', function () {
    console.log('desconectado del servidor');
    // lblOnline.style.display = 'none';
    // lblOffline.style.display = '';
});

socket.on('enviar-mensaje', function (payload) {
    if (payload.mensaje === "play") {
        video.play();
    } else if (payload.mensaje === "pause") {
        video.pause();
    } else {
        if (video.currentTime === payload.mensaje) {} else {
            video.currentTime = payload.mensaje + 0.1;
            // video.play()
        }
    }
});
// btnEnviar.addEventListener('click',()=>{
//     const mensaje = txtMensaje.value
//     const payload = {
//         mensaje,
//         id: "123ABC",
//         fecha: new Date().getTime()

//     }
//     socket.emit('enviar-mensaje',payload)

// })
video.addEventListener('play', function () {
    var mensaje = "play";
    var payload = {
        mensaje: mensaje
    };
    socket.emit('enviar-mensaje', payload);
});
video.addEventListener('pause', function () {
    var mensaje = "pause";
    var payload = {
        mensaje: mensaje
    };

    socket.emit('enviar-mensaje', payload);
});
video.addEventListener('seeked', function () {
    console.log(video.currentTime);
    var mensaje = video.currentTime;
    var payload = {
        mensaje: mensaje
    };
    socket.emit('enviar-mensaje', payload);
});

/// Buttons Events
play.addEventListener('click', function () {
    video.play();
});
pause.addEventListener('click', function () {
    video.pause();
});
back.addEventListener('click', function () {
    video.currentTime += value * -1;
});
foward.addEventListener('click', function () {
    video.currentTime += value;
});