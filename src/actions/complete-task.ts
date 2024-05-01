"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeTask(taskId: string) {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: "completed",
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
