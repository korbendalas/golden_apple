// middleware.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './src/app/api/auth/[...nextauth]/route'; // Adjust the path to your auth options file

export async function middleware(req: Request) {
  const session = await getServerSession(authOptions);

  const url = req.url;

  // If session doesn't exist and the user is trying to access protected routes
  if (!session && url.includes('/tasks')) {
    return NextResponse.redirect(new URL('/auth/login', req.url)); // Redirect to login page if not logged in
  }

  // If session exists and the user is trying to access public routes
  if (
    session &&
    (url === '/' ||
      url.includes('/auth/login') ||
      url.includes('/auth/register'))
  ) {
    return NextResponse.redirect(new URL('/tasks', req.url)); // Redirect to tasks if logged in
  }

  return NextResponse.next(); // Continue processing the request if no conditions match
}

// Define which paths this middleware applies to
export const config = {
  matcher: ['/tasks', '/auth/login', '/auth/register'], // Apply middleware to /tasks, /auth/login, and /auth/register
};
