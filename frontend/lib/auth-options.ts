import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === 'google') {
        if (profile?.email && profile.email.endsWith('@gmail.com') &&
          process.env.ACCEPTED_GOOGLE_ACCOUNTS?.split(',').includes(profile.email)
        ) {
          return true;
        }
      }
      
      if (account?.provider === 'github') {
        if (profile?.email && profile.email.endsWith('@igap.vn')) {
          return true;
        }
      }
      return false
    },
    
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30days
  },
  pages: {
    signIn: "/", //sign in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
