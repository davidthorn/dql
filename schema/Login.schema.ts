import joi from 'joi'

const LoginSchema: joi.ObjectSchema = joi.object({
    email: joi.string().email().required().label('Email Address'),
    password: joi.string().min(6).max(30).required().label('Password')
})

export { LoginSchema }