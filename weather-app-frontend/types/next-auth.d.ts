import { DefaultSession, DefaultUser } from "next-auth";

export declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    id?: string;
    image?: string;
  }

  interface Session extends DefaultSession {
    accessToken?: string;
    user: User;
  }

  interface JWT {
    accessToken?: string;
    id?: string;
    image?: string;
  }
}
