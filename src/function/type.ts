import { UUID } from "crypto"

export type obj = {
    id: UUID
    title: string
    description: string
    status: boolean
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            URI: string
            jwt_secret: string
            cookie_secret: string
        }
    }
}
