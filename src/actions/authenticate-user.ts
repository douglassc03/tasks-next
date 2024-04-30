"use server";
import { signIn } from "@/app/auth/providers";
import { AuthError } from "next-auth";
import { z } from "zod";

const authenticateUserSchema = z.object({
  email: z.string().email({ message: "Please, enter a valid e-mail address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
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
      message: "Please, fill in correctly",
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
      message: "You logged in succefully.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message:
              "E-mail or password is incorrect. Please, try again.",
            success: false,
          };
        default:
          return {
            message: "Something went wrong. Please, try again.",
            success: false,
          };
      }
    }
    throw error;
  }
}