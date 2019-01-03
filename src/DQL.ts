import { BodyDQLEndpoint } from '../src/body/BodyDQLEndpoint'
import e, { Request, Response } from 'express'
import { BodyDQL } from './body/BodyDQL';
import bodyParser = require('body-parser');

export class DQL {

    server: e.Express

    port?: number

    host?: string

    endpoints: BodyDQL

    constructor() {
        this.server = e()
        this.server.use(bodyParser.urlencoded({ extended: true }))
        this.server.use(bodyParser.json({

        }))
        this.endpoints = new BodyDQL()
    }

    add(name: string, endpoint: BodyDQLEndpoint): DQL {
        this.endpoints.add(name, endpoint)
        return this
    }

    listen() {

        this.endpoints.getEndpoints().forEach(data => {

            const defaultMw = (req: Request, res: Response, next: () => any) => {

                console.log(req.body)

                const errors = this.endpoints.validate({
                    body: req.body === undefined ? {} : req.body,
                    originalPath: req.originalUrl
                })

                if (errors.length > 0) {
                    res.status(400).send({
                        statCode: 400,
                        message: 'Bad Request',
                        errors: errors.map(i => { return i.message })
                    })
                } else {
                    next()
                }

            }


            this.server.post(data.path, defaultMw)

            if (data.endpoint.middleware === undefined) return

            this.server.post(data.path, data.endpoint.middleware)


        })

        this.server.use((req, res) => {
            res.status(404).send({
                status: 404,
                message: 'Not Found',
                path: req.originalUrl
            })

        })
        this.server.listen(this.port || 3000, this.host || 'localhost', () => {
            console.log('listening')
        })

        // this.server.get('/' , (req, res) => {
        //     console.log('request received')
        // })
    }

}




export default DQL

