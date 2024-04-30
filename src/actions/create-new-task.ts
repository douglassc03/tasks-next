"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth/providers";

const createNewTaskSchema = z.object({
  title: z.string({ message: "Title must be between 1 and 255 characters" }).min(1).max(255),
  description: z.string({ message: "Description must be between 1 and 255 characters" }).min(1).max(255),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in the format YYYY-MM-DD" }),
  duration: z.number().int().positive({ message: "Duration must be a positive number" }),
  userId: z.string(),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    duration?: string[];
    date?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function createNewTask(prevState: State, formData: FormData) {
  const session = await auth();

  const validatedFields = createNewTaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    duration: Number(formData.get("duration")),
    date: formData.get("date"),
    userId: session?.user.id,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly.",
    };
  }

  const { title, description, duration, date, userId } = validatedFields.data;
  const formattedDate = new Date(date);

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        duration,
        date: formattedDate,
        createdAt: new Date().toISOString(),
        status: "pending",
        userId,
      }
    })
    revalidatePath("/")
    return {
      success: true,
      message: "The task was created successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { message: "Failed to create a new task", success: false };
    }
    throw error;
  }
}