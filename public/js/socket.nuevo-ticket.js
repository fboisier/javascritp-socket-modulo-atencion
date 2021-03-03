var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Conectado al servidor');

    // al conectarme le consulto al servidor cual es el estado actual. 
    socket.on('estadoActual',  (data, callback) => {

        label.text(data.ultimo);
        
        console.log('Cliente: Escuchando, el servidor me acaba de enviar este dato: ',data.ultimo);
        callback("Gracias Servidor.");

    });

});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


$('.btnNuevoTicket').on('click', function () {

    // al presionar nuevo ticket le consulto al servidor cual es el siguiente ticket
    socket.emit('siguienteTicket', null, function (resp) {
       
        label.text(resp);
        console.log('Cliente: Al consultar al servidor, el me dijo esto: ', resp);

    });    

});