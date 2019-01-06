import staticContent from './endpoints/static-content'
import people from './endpoints/people'
import DQLServer from './src/DQLServer'

const server = new DQLServer()

server.add(staticContent.resourcePath , staticContent.endpoint)
server.add(people.resourcePath , people.endpoint)

server.listen()  