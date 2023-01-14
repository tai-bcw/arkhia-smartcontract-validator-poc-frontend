import { PRICING } from './pricing';

export interface SignIn {
    email: string | undefined,
    password: string
}

export interface SignUpPayload {
    email: string,
    password: string,
    accessId: PRICING,
}

export interface SignUpConfirmPayload {
    token: string
}

export interface ForgotPasswordSendEmailPayload {
    email: string
}

export interface ForgotPasswordPayload {
    token: string,
    password: string,
    confirmPassword: string
}

export interface UserInputErrors extends Array<InputError> {
    errors:Array<InputError>;
}

export interface InputError {
    msg: string,
    param: string,
    location:string
}
