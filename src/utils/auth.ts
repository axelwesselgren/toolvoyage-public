import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { openAPI } from "better-auth/plugins"
import { validateEmail, validatePassword } from "./validation/server/signup";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        },
        google: { 
            clientId: process.env.AUTH_GOOGLE_ID as string, 
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string, 
        },
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== "/sign-up/email") {
                return;
            }
            
            const email = ctx.body?.email;
            const password = ctx.body?.password;

            const [messageEmail, successEmail] = validateEmail(email);
            const [messagePassword, successPassword] = validatePassword(password);

            if (!successEmail) {
                throw new APIError("BAD_REQUEST", {
                    message: messageEmail,
                });
            }

            if (!successPassword) {
                throw new APIError("BAD_REQUEST", {
                    message: messagePassword,
                });
            }
        }),
        
    },
    plugins: [
        openAPI(),
    ]
});