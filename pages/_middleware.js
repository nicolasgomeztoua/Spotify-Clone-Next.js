import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  //if they request the auth or have a token let em thru
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //if no token, take em to login.

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("http://localhost:3000/login");
  }
} 
