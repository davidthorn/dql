export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'REST' 
export type AuthenticationScheme = 'Basic' | 'Bearer' | 'FBAuth'

export type AuthorizatonType = 'Basic' | 'Bearer'

export interface BasicAuthentication {
    user: string
    password: string
}


export interface DQLAuthentication {

    /**
     * The name which a DQLEndpoint can reference this by when required in the future
     *
     * @type {string}
     * @memberof DQLAuthentication
     */
    name: string


    /**
     * The scheme type in of the authentication
     *
     * @type {AuthenticationScheme}
     * @memberof DQLAuthentication
     */
    scheme: AuthenticationScheme

    /**
     * The authentications will be carried out in the order of priority
     * The authentication with the highest will be triggered first etc
     * 
     * @type {number}
     * @memberof DQLAuthentication
     */
    priority: number

    /**
     * The path in which it should protect.
     * A regular expression will be carried on the request original path 
     * and if this matches then it will be triggered
     * The resource path must be a minimum of /
     *
     * @type {string}
     * @memberof DQLAuthentication
     */
    resourcePath: RegExp | string
    
    /**
     * The Http Methods which are exempt from authentication
     *
     * @type {HttpMethod[]}
     * @memberof DQLAuthentication
     */
    allowedMethod: HttpMethod[]

    basic?: BasicAuthentication

    firebaseAuth?: any

}

const peopleAuthentication: DQLAuthentication = {
    name: 'people',
    scheme: 'Bearer',
    priority: 1000,
    allowedMethod: [ 'GET' ],
    resourcePath: '/people'
}