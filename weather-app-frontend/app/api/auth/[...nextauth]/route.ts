import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
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
      async authorize(credentials): Promise<User | null> {
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

          const data = await res.json();

          if (data && data.userId && data.email) {
            const user: User = {
              id: data.userId,
              email: data.email,
              name: data.name,
              image: data.image,
              accessToken: data.token,
            };
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Login error");
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
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.image = user.image || "";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      session.user.image = token.image as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
