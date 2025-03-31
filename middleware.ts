import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname
    const token = req.nextauth.token
    
    // adminルートの保護
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "ADMIN" && token?.role !== "CONTRACTOR") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
