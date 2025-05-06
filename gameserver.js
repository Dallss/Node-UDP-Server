import dgram from 'dgram';
const socket = dgram.createSocket('udp4');

const FIELD_WIDTH = 1000;
const FIELD_HEIGHT = 1000;

let online_players = [];

// eventlisteners
socket.on('message', (msg, info) => {
    console.log(`[ message ]: ${msg} \nfrom: ${info.port}`);

    console.log(msg.length)
    if (msg.readUInt16BE(0) == 12345) {
        const port = info.port;
        const host = info.address;
        const player = {
            host: host,
            port: port,
            x: randomInt(0, FIELD_WIDTH),
            y: randomInt(0, FIELD_HEIGHT),
        };

        online_players.push(player);
        console.log(`port: ${info.port} is joined`);

    } else {
        console.log(`port: ${info.port} tried to join`);
    }
});

socket.on('error', (e) => {
    console.log(`[ error occured! ]: ${e}`);
});

// bind
socket.bind(8181, () => {
    console.log('Server Online. on port 8181');

    gameLoop();
});

console.log('gameloop starting');
function gameLoop() {
    if(online_players.length >= 1){
        for (const player of online_players) {
            const coords = Buffer.alloc(4);
            coords.writeUInt16BE(player.x, 0);
            coords.writeUInt16BE(player.y, 2);
            socket.send(coords, player.port, player.host);
        }
    }

    setImmediate(gameLoop)
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
