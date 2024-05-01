"use server";
import { auth } from "@/app/auth/providers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditTaskFormSchema = z.object({
  id: z.string(),
  title: z.string().min(3, { message: "The title must be at least 3 characters" }),
  description: z.string().min(3, { message: "The description must be at least 3 characters" }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "The date must be in the format YYYY-MM-DD" }),
  duration: z.number().int().positive({ message: "The duration must be a positive number" }),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    date?: string[];
    duration?: string[];
  };
  message: string;
  success?: boolean;
};

export async function editTask(prevState: State, formData: FormData) {
  const validatedFields = EditTaskFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    duration: Number(formData.get("duration")),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please, fill the fields correctly.",
    };
  }

  const { id, title, description, date, duration } =
    validatedFields.data;
  
  const validatedDate = new Date(date);

  try {
    await prisma.task.update({
      where: {
        id: id as string,
      },
      data: {
        title,
        description,
        date: validatedDate,
        duration,
        updatedAt: new Date(),
      },
    });
    revalidatePath("/");
    return { message: "Task was updated successfully.", success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { message: "Failed to update the task", success: false };
    }
    throw error;
  }
}
