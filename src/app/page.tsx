import { getTasksOfUser } from "@/actions/get-tasks-of-user"
import { auth } from "@/app/auth/providers"
import { TasksTable } from "@/components/tasks-table";
import { UnfinishedTasks } from "@/components/unfinished-tasks";
import { Task } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Task Manager - Home',
  description:
    "Task Manager is a simple web application to manage your tasks. It allows you to create, edit, delete and mark as done your tasks.",
};

export default async function Home() {
  const session = await auth()
  const tasks = await getTasksOfUser(session?.user.id) as Task[]

  return (
    <div className="mx-auto flex flex-col p-4 gap-4 max-w-[1300px] overflow-hidden">
      {tasks.find(task => task.status === 'pending') && <UnfinishedTasks tasks={tasks} />}
      <div className="bg-zinc-900 flex flex-col rounded-lg p-3 w-full h-full">
        <TasksTable tasks={tasks} />
      </div>
    </div>
  );
}
