import dgram from 'dgram';
class player {
    constructor(name, code){
        this.connect_code = code || 12345
        this.socket = dgram.createSocket('udp4')
        this.name = name
        this.x = 50
        this.y = 50
        
        this.socket.bind(0,()=>{
            this.port = this.socket.address().port
        })
        this.socket.on('message', (msg, rinfo) => {
            this.x = msg.readUInt16BE(0)
            this.y = msg.readUInt16BE(2)
        });
        this.socket.on('error', (err) => {
            console.log(`Client binded on port: ${this.socket.port} error: ${err}.`);
            this.socket.close();
        });
    }

    connect() {
        this.socket.connect(8181,'localhost',(err)=>{
            if (err) {
                console.log(`Failed to connect: ${err}`);
            } else {
                const connect_code_buff = Buffer.alloc(2);
                connect_code_buff.writeUInt16BE(this.connect_code);
                this.socket.send(connect_code_buff, ()=>{
                    console.log(`Sent connection code to server at localhost 8181`);
                })
            }
        })
    }
}

export default player




