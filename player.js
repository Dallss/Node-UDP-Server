const dgram = require('dgram')

const client = dgram.createSocket('udp4')



message = Buffer.from('Hello is anyone there!')

const serverHost = 'localhost'; // Replace with your server's IP address
const serverPort = 8181;


client.on('message', (msg, rinfo) => {
    console.log(`Received response from server: ${msg} from ${rinfo.address}:${rinfo.port}`);
    client.close();  // Close the client after receiving the response
});
  
// Handle errors
client.on('error', (err) => {
    console.log(`Client error: ${err}`);
    client.close();
});


// Send the message to the server
client.send(message, 0, message.length, serverPort, serverHost, (err) => {
    if (err) {
      console.error('Error sending message:', err);
      client.close();
    } else {
      console.log('Message sent to server!');
    }
});


