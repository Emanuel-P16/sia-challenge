const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.paths = {
        }
        // Middlewares
        this.middlewares();


        // Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );


        // Directorio Público
        this.app.use( express.static('public') );


    }



    sockets(){
        this.io.on('connection',socket=>{
            console.log('cliente conectado' ,socket.id)
            socket.on('disconnect',()=>{
                console.log('Cliente desconectado', socket.id)
            })
            socket.on('enviar-mensaje',(payload)=>{
                    console.log(payload)
                    this.io.emit('enviar-mensaje',payload)
                
            })
            socket.on('seeked',(payload)=>{
                console.log(payload)
                this.io.emit('seeked',payload)

            
            
        })
        })
    }
    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;