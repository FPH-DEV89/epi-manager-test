import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    // TODO: Replace with real database lookup or environment variable check
                    // For now, hardcoded admin user for demonstration
                    if (email === "admin@epi-manager.com" && password === "admin123") {
                        return { id: "1", name: "Admin User", email: email }
                    }
                    return null
                }

                console.log("Invalid credentials")
                return null
            },
        }),
    ],
})
