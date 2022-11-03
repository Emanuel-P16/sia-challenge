'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var cors = require('cors');

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.oldmsg = {};
        this.paths = {};
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    _createClass(Server, [{
        key: 'conectarDB',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return dbConnection();

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function conectarDB() {
                return _ref.apply(this, arguments);
            }

            return conectarDB;
        }()
    }, {
        key: 'middlewares',
        value: function middlewares() {

            // CORS
            this.app.use(cors());

            // Directorio Público
            this.app.use(express.static('public'));
        }
    }, {
        key: 'routes',
        value: function routes() {}
    }, {
        key: 'sockets',
        value: function sockets() {
            var _this = this;

            this.io.on('connection', function (socket) {
                console.log('cliente conectado', socket.id);
                socket.on('disconnect', function () {
                    console.log('Cliente desconectado', socket.id);
                });
                socket.on('enviar-mensaje', function (payload) {
                    console.log(payload);
                    _this.io.emit('enviar-mensaje', payload);
                });
            });
        }
    }, {
        key: 'listen',
        value: function listen() {
            var _this2 = this;

            this.server.listen(this.port, function () {
                console.log('Servidor corriendo en puerto', _this2.port);
            });
        }
    }]);

    return Server;
}();

module.exports = Server;