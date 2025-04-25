const dgram = require('dgram');

const socket = dgram.createSocket('udp4')




// eventlisteners

socket.on('message', (msg, info)=>{
    console.log(`[ message ]: ${msg} \nfrom: ${info}`);

    socket.send(Buffer.from('Hello from the otherside!'), info.port, info.address);
})

socket.on('error', (e)=>{
    console.log(`[ error occured! ]: ${e}`);
})


// bind
socket.bind(8181, ()=>{
    console.log('Server Online.');    
})