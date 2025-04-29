import dgram from 'dgram';
const socket = dgram.createSocket('udp4');

const FIELD_WIDTH = 370;
const FIELD_HEIGHT = 1000;

let online_players = [];
let available_id = 0;

// eventlisteners
socket.on('message', (msg, info) => {
    console.log(`[ message ]: ${msg} \nfrom: ${info.port}`);

    console.log(msg.length)
    if (msg.readUInt16BE(0) == 12345) {
        const port = info.port;
        const host = info.address;
        const player = {
            id: available_id,
            host: host,
            port: port,
            x: randomInt(0, 370),
            y: randomInt(0, 1000),
        };

        online_players.push(player);
        console.log(`port: ${info.port} is joined`);

        available_id += 1;
    } else {
        console.log(`port: ${info.port} tried to join`);
    }
});

socket.on('error', (e) => {
    console.log(`[ error occured! ]: ${e}`);
});

// bind
socket.bind(8181, () => {
    console.log('Server Online.');

    gameLoop();
});

console.log('gameloop starting');
function gameLoop() {
    if(online_players.length >= 1){
        for (const player of online_players) {
            // abstract this serialization
            // one byte for player id, 4 bytes for coordinates
            const coords = Buffer.alloc(5);
            coords.writeUInt16BE(player.id, 0);
            coords.writeUInt16BE(player.x, 1);
            coords.writeUInt16BE(player.y, 2);
            socket.send(coords, player.port, player.host);

            player.y +=1;
        }
    }

    setImmediate(gameLoop)
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
