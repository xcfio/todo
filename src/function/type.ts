import { UUID } from "crypto"

export interface obj {
    id: UUID
    users: UUID
    title: string
    description: string
    status: boolean
}

export interface user {
    id: UUID
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
