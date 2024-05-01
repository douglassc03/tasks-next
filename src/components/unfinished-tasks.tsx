import { Task } from "@prisma/client";
import { CompleteTaskForm } from "@/components/complete-task-form";
import { DeleteTaskModal } from "@/components/delete-task-modal";
import { Chip } from "@nextui-org/react";

export function UnfinishedTasks({ tasks }: { tasks: Task[] }) {
    const unfinishedTasks = tasks.filter((task) => task.status === "pending");

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">Unfinished Tasks</h2>
                <Chip
                    className="capitalize"
                    color="warning"
                    size="sm"
                    variant="flat"
                >
                    pending
                </Chip>
            </div>
            <ul className="flex flex-col gap-2">
                {unfinishedTasks.map((task) => (
                    <div key={task.id} className="flex gap-2 border border-zinc-600 p-2 rounded-2xl items-center justify-between">
                        <div className="flex gap-2 items-center">
                        <li>{task.title}</li>
                        <span className="text-gray-500">-</span>
                        <li>{task.duration} minutes</li>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CompleteTaskForm id={task.id} />
                            <DeleteTaskModal id={task.id} title={task.title} />
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}