import { UUID } from "crypto"

export type obj = {
    id: UUID
    title: string
    description: string
    status: boolean
}

export type user = {
    id: UUID
    users: UUID
    username: string
    email: string
    password: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            URI: string
            JWT_SECRET: string
            COOKIE_SECRET: string
            SALT: string
        }
    }
}
