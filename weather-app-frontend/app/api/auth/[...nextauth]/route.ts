import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User, Session, Account } from "next-auth";
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
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      user?: User;
    }) {
      if (account?.provider === "google" && account?.access_token) {
        // Handling Google sign-in
        try {
          const response = await fetch(
            `${backendApiRoutes.CREATE_GOOGLE_USER}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user?.email,
                name: user?.name,
                image: user?.image,
              }),
            }
          );
          console.log("API Response Status:", response.status);

          if (!response.ok) {
            console.error(
              "Failed to create user in backend during Google sign-in"
            );
            throw new Error(
              "Failed to create user in backend during Google sign-in"
            );
          }

          const result = await response.json();
          console.log("Google User Creation Result:", result);

          token.id = result.userId;
          token.image = user?.image || "";
          token.accessToken = account.access_token;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          throw error;
        }
      }

      // For custom credentials login
      if (user) {
        token.id = user.id;
        token.image = user.image || "";
        token.accessToken = user.accessToken || token.accessToken;
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
