import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/actions/get-user-by-email";
import bcrypt from "bcrypt";
import { z } from "zod";
import NextAuth from "next-auth";

const providers = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email("Digite um e-mail válido."),
            password: z
              .string()
              .min(8, "A senha deve ter pelo menos 8 caracteres."),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
};

export const { signIn, auth, signOut } = NextAuth(providers);