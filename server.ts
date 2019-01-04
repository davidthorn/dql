import application from './app'
import DQL from './src/DQL'
import personEndpoint from './mockServer'

const server = new DQL()

server.add(application.path , application.endpoint)
server.add(personEndpoint.path , personEndpoint.endpoint)

server.add('/app' , {
    body: {
        name: {
            type: 'string',
            required: true,
            errors: {
                type: [ "You are an idiot" ]
            },
            parse: JSON.parse
        },
        surname: {
            type: 'boolean' 
        },
        isOld: {
            type: 'boolean'
        },
        age: {
            type: 'number'
        }
    }, 
    method: 'POST', 
    
    middleware: (req, res) => {
        res.status(200).send({
            mesage: 'mother fucker /app' , 
            body: req.originalUrl
        })
    }
})
.add('/' , {
    body : {

    },
    middleware: (req, res) => {
        res.status(200).send({
            mesage: 'mother fucker',
            body: req.originalUrl
        })
    }
})
.listen()

// const server = DQL.server

// // server.listen(3000 , 'localhost' , () => {

// // })

