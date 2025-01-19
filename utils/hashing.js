import {hash, compare} from "bcrypt"


export const doHash = (value, salt) => {
    const result = hash(value, salt)
    return result
}

export const doHashValidation = (value, hashedValue) => {
    const result = compare(value, hashedValue)
    return result
}