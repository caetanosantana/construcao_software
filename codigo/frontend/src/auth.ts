import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { db } from "./db";
import { MagicLinkTemplate, MagicLinkText } from "./components/auth/email/magiclink";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    Resend({
      async sendVerificationRequest(params) {
        const { identifier: to, provider, url, theme } = params;
        const { host } = new URL(url);
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to,
            subject: `Logue-se em ${host}`,
            html: MagicLinkTemplate({url, host, theme}),
            text: MagicLinkText({ url, host }),
          }),
        });

        if (!res.ok)
          throw new Error("Resend error: " + JSON.stringify(await res.json()));
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
});
