import home from './endpoints/home'
import app from './endpoints/app'
import root from './endpoints/root'
import people from './endpoints/people'
import DQL from './src/DQL'

const server = new DQL()

server.add(home.path , home.endpoint)
server.add(app.path , app.endpoint)
server.add(root.path , root.endpoint)
server.add(people.path , people.endpoint)
server.listen()