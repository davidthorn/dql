import staticContent from './endpoints/static-content'
import people from './endpoints/people'
import app from './endpoints/app'
import login from './endpoints/login'
import register from './endpoints/register'
import DQLServer from './src/DQLServer'

const server = new DQLServer()

server.addAuthentication({
    scheme: 'Basic',
    resourcePath: /\/people\/([\d]+)/,
    allowedMethod: [],
    name: 'bearer',
    priority: 1,
    basic : {
        user: 'david',
        password: '123456' 
    }
})

server.addAuthentication({
    scheme: 'FBAuth',
    resourcePath: /\/app/,
    allowedMethod: [],
    name: 'bearer',
    priority: 1,
    firebaseAuth: {
        API_KEY: process.env.API_KEY || ''
    }
})

server.addAuthentication({
    scheme: 'Basic',
    resourcePath: /\/people/,
    allowedMethod: ['HEAD'],
    name: 'basic',
    priority: 2,
    basic : {
        user: 'david',
        password: '123456' 
    }
})

server.add(staticContent.resourcePath , staticContent.endpoint)
server.add(login.resourcePath , login.endpoint)
server.add(people.resourcePath , people.endpoint)
server.add(app.resourcePath , app.endpoint)
server.add(register.resourcePath , register.endpoint)
server.host = process.env.HOST
server.port = parseInt(process.env.PORT || '3000') 

console.log({
    host: server.host || 'not set',
    port: server.port || 'not set',
    firebase: {
        port: process.env.FIREBASE_PORT,
        host: process.env.FIREBASE_HOST
    }
})

server.listen()       