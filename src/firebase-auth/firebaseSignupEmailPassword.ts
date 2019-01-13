import fetch, { Response } from 'node-fetch'
import { AuthEmailLoginParams } from './AuthEmailLoginParams';
import { AuthEmailLoginResponse } from './AuthEmailLoginResponse';
import AuthEmailLoginError from './AuthEmailLoginError';
import * as joi from 'joi'

const path = '/identitytoolkit/v3/relyingparty/'

export const validateFirebaseEnvironmentVariables = (): Promise<{ host: string, port: string }> => {

    const { value, error } = joi.object({
        FIREBASE_HOST: joi.string().required(),
        FIREBASE_PORT: joi.string().allow('').optional()
    }).validate(process.env, {
        abortEarly: false,
        allowUnknown: true

    })

    if (error === null) {
        return Promise.resolve({
            host: value.FIREBASE_HOST!,
            port: value.FIREBASE_PORT!
        })
    } else {
        return Promise.reject(error)
    }

}

const firebaseSignupEmailPassword = async (params: AuthEmailLoginParams) => {

    const { host, port } = await validateFirebaseEnvironmentVariables().catch(error => {
        throw error
    })

    let fb_host = `${host}${port}`

    const { email, password } = params.credentials

    return await fetch(`${fb_host}${path}signupNewUser?key=${params.API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password,
            returnSecureToken: params.returnSecureToken
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(async (value: Response) => {
            switch (value.status) {
                case 200:
                    const info: AuthEmailLoginResponse = await value.json()
                    return Promise.resolve(info)
                default:
                    const error: AuthEmailLoginError = await value.json()
                    return Promise.reject(error)
            }
        })
}

export default firebaseSignupEmailPassword

