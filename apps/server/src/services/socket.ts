import { Server } from "socket.io";
import {Redis} from 'ioredis'
import type { RedisOptions } from 'ioredis';


const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
    throw new Error(
        'Missing Redis configuration. Set REDIS_HOST, REDIS_PORT and REDIS_PASSWORD in environment variables.'
    );
}
const redisPort = REDIS_PORT as number;
const redisPassword = REDIS_PASSWORD as string;

const baseOptions: RedisOptions = {
    host: REDIS_HOST as string,
    port: redisPort,
    password: redisPassword,
};

if (REDIS_USERNAME) {
    const optsWithUser: RedisOptions = { ...baseOptions, username: REDIS_USERNAME };
    var pub = new Redis(optsWithUser);
    var sub = new Redis(optsWithUser);
} else {
    var pub = new Redis(baseOptions);
    var sub = new Redis(baseOptions);
}


class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
        cors:{
            allowedHeaders: ['*'],
            origin: '*'
        }
    });
      sub.subscribe('MESSAGES');
  }

  public initListeners(){
    const io = this.io;
    console.log("Init Socket Listeners...");
    io.on('connect', async socket => {
        console.log("New Socket connected", socket.id);

        socket.on('event: message', async({message}: {message:string}) => {
            console.log("New Message Received", message);
            await pub.publish('MESSAGES', JSON.stringify({ message }));
        })
    });
    sub.on('message', (channel, message) => {
        if(channel === 'MESSAGES'){
            io.emit('message', message);
        }
    })
  }

  get io(): Server {
    return this._io;
  }
}

export default SocketService;
