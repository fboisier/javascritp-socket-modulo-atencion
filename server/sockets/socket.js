const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    // al conectar me quedo escuchando a que los clientes me pidan siguiente ticket
    client.on('siguienteTicket', (mensaje, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log('Servidor: Cliente me pidio un ticket ', siguiente);
        callback(siguiente);

    });


    let ultimo = ticketControl.getUltimoTicket();
    let ultimos4 = ticketControl.getUltimos4();


    // al conectar les cuento a todos los clientes en que estado quedo al final. 
    client.emit('estadoActual', { ultimo, ultimos4 }, function (resp) {
        console.log('Servidor: La respuesta del cliente sobre estadoActual es: ', resp);
    });


    // escuchemos si algun escritorio quiere algun ticket
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio)
            return callback({
                err: true,
                mensaje:'escritorio es necesario'
            });

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimos4()
        })

    });


});