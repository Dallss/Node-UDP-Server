import dgram from 'dgram';

let playersPortStart = 1000;
let offset = 0;

const connect_code = 12345
const server_host = 'localhost'; // Replace with your server's IP address
const server_port = 8181;
  
const players = {
    randall: {
        socket: dgram.createSocket('udp4'),
        x: 0,
        y: 0,
    },
    Arwin: {
        socket: dgram.createSocket('udp4'),
        x: 0,
        y: 0,
    },
    jeric: {
        socket: dgram.createSocket('udp4'),
        x: 0,
        y: 0,
    }

}
function connectPlayer(player){
    player.socket.on('message', (msg, rinfo) => {
        player.x = msg.readUInt16BE(1)
        player.y = msg.readUInt16BE(2)

        console.log(`player: ${Object.keys(player)[0]} x: ${player.x}, y: ${player.y}`)
    });
    player.socket.on('error', (err) => {
        console.log(`Client binded on port: ${player.socket.port} error: ${err}.`);
        player.socket.close();
    });
    player.socket.bind(playersPortStart, () => {
        console.log(`Client bound to port: ${player.socket.address().port}`);

        const connect_code_buff = Buffer.alloc(2);
        connect_code_buff.writeUInt16BE(connect_code);

        player.socket.send(connect_code_buff, server_port, server_host, (err) => {
            if (err) {
                console.log(`Error sending message: ${err}`);
            } else {
                console.log(`Sent connection code to server at ${server_host}:${server_port}`);
            }
        });
    });

    playersPortStart += 1
}



connectPlayer(players.randall)
connectPlayer(players.Arwin)
connectPlayer(players.jeric)

