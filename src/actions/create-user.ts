"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";

const createUserSchema = z.object({
  firstName: z.string().min(2, { message: "The first name must at least 2 caracters" }),
  lastName: z.string().min(2, { message: "The first name must at least 2 caracters" }),
  email: z.string().email({ message: "Please, enter a valid e-mail address" }),
  password: z
    .string()
    .min(8, { message: "The password must be at least 8 caracters" })
});

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function createUser(prevState: State, formData: FormData) {
  noStore();

  const validatedFields = createUserSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, preencha os campos corretamente.",
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: encryptedPassword,
        createdAt: new Date(),
      }
    })
    revalidatePath("/auth/sign-up")
    return {
      success: true,
      message: "The user was created successfully",
    };
  } catch (error) {
    return {
      message: "Something is wrong. Please, try again.",
      success: false,
    };
  }
}