import Facebook from "./providers/facebook"
import Google from "./providers/google"
import { AuthOptions } from "./types"

export const authOptions = {
    providers: {
        facebook: new Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        google: new Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    },
} satisfies AuthOptions

export type Providers = "credentials" | keyof typeof authOptions.providers

