// import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { serialize } from "cookie";

const {
    JWT_KEY,
} = process.env;
const middleware = async (req, res) => {
    const routesNotAuth = ['/login'];
    const token = req.cookies.get('userToken');
    console.log(req.nextUrl.pathname);
    if (!token) return NextResponse.redirect(new URL('/login', req.url));
    try {
        await jwtVerify(token.value, new TextEncoder().encode(JWT_KEY));
    } catch (error) {
        if (req.nextUrl.pathname.includes(routesNotAuth)) return NextResponse.next();
        return NextResponse.redirect(new URL('/login', req.url));
    };
    if (req.nextUrl.pathname.includes(routesNotAuth)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    };
    return NextResponse.next();
};

export const config = {
    matcher: ['/', '/dashboard/:path*', '/login']
};

export default middleware;