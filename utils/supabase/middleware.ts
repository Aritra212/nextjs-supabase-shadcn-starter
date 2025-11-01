import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user } } = await supabase.auth.getUser();

    // Define public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/sign-up", "/auth"];
    const isPublicRoute = publicRoutes.some((route) =>
      request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`)
    );

    // If not a public route and user is not authenticated, redirect to login
    if (!isPublicRoute && !user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Auth routes - redirect to home if already authenticated
    const authRoutes = ["/login", "/sign-up"];
    const isAuthRoute = authRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  } catch (e) {
    console.error("Failed to update session:", e);
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};