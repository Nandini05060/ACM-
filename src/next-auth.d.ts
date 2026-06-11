import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "TEAM_MEMBER" | "CHAIRPERSON" | "FACULTY" | "SUPERADMIN";
    } & DefaultSession["user"];
  }
}
