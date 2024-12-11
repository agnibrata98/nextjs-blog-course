import { NextRequest, NextResponse } from "next/server";
export function middleware(request : NextRequest) {
  const token = request.cookies.get("token");

  if (!token || token === undefined) {
    request.nextUrl.pathname = "/auth/login";

    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/cms/all-blogs", "/cms/all-blogs/:slug*","/cms/blog-categories", "/cms/all-courses", "/cms/latest-blogs", "/cms/services", "/cms/team-members", "/cms/testimonial","/students/all-students", "/students/all-students/:slug*","/students/create"],
};
