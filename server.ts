const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const FIELD_WIDTH: number = 370;
const FIELD_HEIGHT: number = 1000;

interface MessageInfo {
    address: string;    // The IP address of the sender
    port: number;       // The port number of the sender
    size: number;       // The size of the received message in bytes
    family: string;     // The address family (e.g., 'IPv4' or 'IPv6')
}

type coordinates = {
    x: number;
    y: number;
};

type player = {
    id: number;
    x: number;
    y: number;
    port: number;
    host: string;
};

const online_players: Array<player> = [];
let available_id: number = 0;

// eventlisteners
socket.on('message', (msg:Buffer, info:MessageInfo) => {
    console.log(`[ message ]: ${msg} \nfrom: ${info}`);

    if (msg.readUInt16BE(0) == 12345) {
        const port: number = info.port;
        const host: string = info.address;
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
        console.log(console.log(`port: ${info.port} tried to join`));
    }
});
socket.on('error', (e:Error) => {
    console.log(`[ error occured! ]: ${e}`);
});

// bind
socket.bind(8181, () => {
    console.log('Server Online.');

    gameLoop();
});

function gameLoop() {
    console.log('gameloop started');

    for (const player of online_players) {
        // abstract this serialization
        // one byte for player id, 4 bytes for coordinates
        const coords = Buffer.alloc(5);
        coords.writeUInt16BE(player.id, 0);
        coords.writeUInt16BE(player.x, 1);
        coords.writeUInt16BE(player.y, 2);
        socket.send(coords, player.port, player.host);
    }
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
