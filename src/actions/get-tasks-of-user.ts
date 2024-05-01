"use server";
import { prisma } from "@/lib/prisma";

export async function getTasksOfUser(userId : string | undefined) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        user: {
          id: userId,
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        duration: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } catch (error) {
    return console.log(error);
  }
}
