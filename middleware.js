import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log("Current Path:", path);
  
  const isDashboard = path.startsWith("/dashboard");
  const authToken = request.cookies.get("token");
  console.log("Auth Token:", authToken);

  if (isDashboard) {
    if (authToken) {
      console.log("User is already authenticated. Allowing access to dashboard.");
      return NextResponse.next();
    } else {
      console.log("User is not authenticated. Redirecting to login page.");
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // If it's not a dashboard route, allow the request to proceed.
  return NextResponse.next();
}

export const config = {
  // Define the routes that the middleware should be applied to.
  matcher: ["/", "/login", "/dashboard", "/dashboard/:path*"],
};
