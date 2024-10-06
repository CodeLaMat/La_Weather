import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { backendApiRoutes } from "@/lib/apiRoutes";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("Missing credentials");
          return null;
        }
        try {
          const res = await fetch(`${backendApiRoutes.LOGIN}`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse.message || "Login failed");
          }

          const user = await res.json();
          if (res.ok && user) {
            console.log(user);
            return user;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error("Login error:", error.message);
          throw new Error(error.message || "Login error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Add the image from the token or user object to the session
      if (!session.user) {
        session.user = {};
      }
      if (token?.image) {
        session.user.image = token.image as string;
      } else if (user?.image) {
        session.user.image = user.image as string;
      } else {
        session.user.image = "";
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add image to JWT token
      if (user) {
        token.image = user.image || "";
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
