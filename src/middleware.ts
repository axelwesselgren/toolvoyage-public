import { NextRequest, NextResponse } from "next/server";
import { createAuthClient } from "better-auth/react";

const client = createAuthClient();

const bannedSessionUrls = ['/signup', '/login'];
const bannedUnAuthUrls = ['/dashboard'];
 
const getSession = async (request: NextRequest) => {
    console.log("Cookie", request.headers.get("cookie"));

    const { data: session } = await client.getSession({
        fetchOptions: {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        }
    });
    
    
    return session;
}

export async function middleware(request: NextRequest) {
    const session = await getSession(request);
    console.log(session);
    
    const url = request.nextUrl.pathname;

    if (session && bannedSessionUrls.includes(url)) {
        const redirectUrl = new URL('/dashboard', request.nextUrl.origin);
        return NextResponse.redirect(redirectUrl);
    }

    if (!session && bannedUnAuthUrls.includes(url)) {
        const redirectUrl = new URL('/signup', request.nextUrl.origin);
        return NextResponse.redirect(redirectUrl);
    }

	return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|public).*)', '/']
};