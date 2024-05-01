"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
