import staticContent from './endpoints/static-content'
import people from './endpoints/people'
import login from './endpoints/login'
import DQLServer from './src/DQLServer'

const server = new DQLServer()

server.addAuthentication({
    scheme: 'Bearer',
    resourcePath: /\/people\/([\d]+)/,
    allowedMethod: [],
    name: 'bearer',
    priority: 1
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

server.listen()     