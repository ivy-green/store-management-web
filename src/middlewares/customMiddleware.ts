'use server'

import { URL_HOME } from "@/assets/contraints";
import { NextRequest, NextResponse } from "next/server";
// import { parseCookies } from 'nookies';
import { cookies } from 'next/headers';

export const redirectMiddleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const cookiesList = cookies()
    const roles = cookiesList.get("roles")?.value;

    console.log(pathname);
    console.log(pathname == "/");

    if (pathname == "/") {
        return NextResponse.redirect(new URL(URL_HOME, request.url));
    }

    if (roles) {
        if (!roles.includes("Customer")) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL(URL_HOME, request.url));
}
