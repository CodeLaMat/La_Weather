import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User, Session, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { backendApiRoutes } from "@/lib/apiRoutes";
import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
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
            // Return null for invalid credentials instead of throwing an error
            console.error("Invalid login attempt:", await res.json());
            return null;
          }

          const data = await res.json();
          if (data && data.userId && data.email) {
            return {
              id: data.userId,
              email: data.email,
              name: data.name,
              image: data.image,
              accessToken: data.token,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
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
      account: Account | null;
      user: User | undefined;
    }) {
      if (account?.provider === "google" && account.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = (account.expires_at || 0) * 1000;

        try {
          const response = await fetch(
            `${backendApiRoutes.CREATE_GOOGLE_USER}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${account.access_token}`,
              },
              body: JSON.stringify({
                email: user?.email,
                name: user?.name,
                image: user?.image,
              }),
            }
          );

          if (!response.ok) {
            console.error("Failed to create Google user in backend.");
            throw new Error("Backend error creating Google user.");
          }

          const result = await response.json();
          token.id = result.userId;
          token.image = user?.image || "";
        } catch (error) {
          console.error("Google sign-in error:", error);
        }
      }

      if (user) {
        token.id = user.id;
        token.image = user.image || "";
        token.accessToken = user.accessToken || token.accessToken;
      }

      if (typeof token.expiresAt === "number" && Date.now() > token.expiresAt) {
        try {
          const refreshedToken = await refreshGoogleToken(
            token.refreshToken as string
          );
          token.accessToken = refreshedToken.accessToken;
          token.expiresAt = refreshedToken.expiresAt;
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
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

async function refreshGoogleToken(refreshToken: string) {
  try {
    const client = new OAuth2Client(clientId, clientSecret);
    const { tokens } = await client.getToken(refreshToken);
    return {
      accessToken: tokens.access_token,
      expiresAt: tokens.expiry_date || Date.now() + 3600 * 1000,
    };
  } catch (error) {
    console.error("Failed to refresh Google access token:", error);
    throw error;
  }
}

export { handler as GET, handler as POST };
