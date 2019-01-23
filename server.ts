import { login } from './endpoints/login';
import register from './endpoints/register';
import { dqllog } from './log';
import DQLServer from './src/DQLServer';

const server = new DQLServer()

server.add(login.resourcePath, login.endpoint)
server.add(register.resourcePath, register.endpoint)
server.host = process.env.HOST
server.port = parseInt(process.env.PORT || '3000')

dqllog('Environment', {
    host: server.host || 'not set',
    port: server.port || 'not set',
    firebase: {
        DEBUG: process.env.DEBUG,
        FIREBASE_PORT: process.env.FIREBASE_PORT,
        FIREBASE_HOST: process.env.FIREBASE_HOST,
        API_KEY: process.env.API_KEY
    }
})

server.listen()       