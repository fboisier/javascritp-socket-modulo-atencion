

var socket = io();


var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams);

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error ('el escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('.btnAtenderTicket').on('click', function(){


    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        
        if(resp === "no hay tickets"){
            label.text('('+ resp + ')');
            alert(resp);
            return 
        }
        
        label.text('Ticket: ' + resp.numero);

        console.log(resp);
    });

});