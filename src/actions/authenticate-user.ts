"use server";
import { signIn } from "@/app/auth/providers";
import { AuthError } from "next-auth";
import { z } from "zod";

const authenticateUserSchema = z.object({
  email: z.string().email({ message: "Por favor, digite um e-mail válido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
  });

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function authenticateUser(prevState: State, formData: FormData) {
  const validatedFields = authenticateUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return {
      success: true,
      message: "Você foi logado com sucesso.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message:
              "E-mail ou senha são inválidos. Por favor, tente novamente.",
            success: false,
          };
        default:
          return {
            message: "Algo deu errado. Por favor, tente novamente.",
            success: false,
          };
      }
    }
    throw error;
  }
}