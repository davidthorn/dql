import fetch, { Response } from 'node-fetch';
import AuthEmailLoginError from './AuthEmailLoginError';
import { AuthEmailLoginParams } from './AuthEmailLoginParams';
import { AuthEmailLoginResponse } from './AuthEmailLoginResponse';
import { validateFirebaseEnvironmentVariables } from './firebaseSignupEmailPassword';

const path = '/identitytoolkit/v3/relyingparty/'

/**
 * 
 *
 * @param {AuthEmailLoginParams} params
 * @returns
 */
const firebaseAuthLoginEmailPassword = async (params: AuthEmailLoginParams) => {

    const { host, port } = await validateFirebaseEnvironmentVariables().catch(error => {
        throw error
    })

    let fb_host = `${host}${port}`

    const { email, password } = params.credentials

    return await fetch(`${fb_host}${path}verifyPassword?key=${params.API_KEY}`, {
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

export default firebaseAuthLoginEmailPassword

