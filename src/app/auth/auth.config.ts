import { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");
      const isPrivateRoutes = !isAuthRoutes && nextUrl.pathname.startsWith("/");

      if (!isLoggedIn && isPrivateRoutes) {
        return false;
      }

      if (isLoggedIn && isAuthRoutes) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id;
      if (token.firstName) session.user.firstName = token.firstName;
      if (token.lastName) session.user.lastName = token.lastName;
      return session;
    },
  },
} as NextAuthConfig;