import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { backendApiRoutes } from "@/lib/apiRoutes";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) {
          console.error("Missing credentials");
          return null;
        }
        console.log("CredentialsProvider authorize function invoked");

        try {
          const res = await fetch(`${backendApiRoutes.LOGIN}`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          console.log("Login response status:", res.status);

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error(
              "Error response from backend:",
              res.status,
              errorResponse
            );
            throw new Error(errorResponse.message || "Login failed");
          }

          const user = await res.json();
          console.log("User authenticated successfully:", user);
          if (res.ok && user) {
            return user;
          }
        } catch (error: any) {
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
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
