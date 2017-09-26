var socket = io();            
socket.on('broadcast',function(data){
    console.log(data);
     $('#tab_body').append('<tr><td class="col-xs-2">'+data.nickname+'<td><td class="col-xs-8">'+data.data+'</td></tr>');
});

socket.on('num_clients', function(data){
    console.log(data.number);
});