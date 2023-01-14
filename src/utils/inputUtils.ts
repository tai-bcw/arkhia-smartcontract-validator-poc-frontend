const emailRegex = new RegExp(/(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}\])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))/);
const hasOneNumber = new RegExp(/\d/);
const hasOneCapital = new RegExp(/(?=.*[A-Z])/);
const hasOneSpecialCharacter = new RegExp(/[!@#$%^&*(),.?":{}|<>]/);

export const validateEmail = (email: string) => {
    return emailRegex.test(email.toLowerCase());
};

export const validatePassword = (password: string) => {
    return hasOneCapital.test(password) && hasOneNumber.test(password) && hasOneSpecialCharacter.test(password) && password.trim().length > 0;
};

export enum FallbackErrorMsg {
    PASSWORD_COMPLEXITY = `Password must have a min length of 8, one number, capital letter and a special character`,
    SERVER_UNAVAILABLE = `Unfortunate error has occured, please try again later`
}
