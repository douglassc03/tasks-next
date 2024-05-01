"use client"
import { completeTask } from "@/actions/complete-task";
import { FaCheck } from "react-icons/fa";
import { Button } from "@nextui-org/react"
import { toast } from "react-hot-toast"

export function CompleteTaskForm({ id }: { id: string }) {
  function handleCompleteTask() {
    completeTask(id)
    toast.success("Task completed successfully")
  }

  return (
    <form action={handleCompleteTask} className="w-full">
      <Button color="primary" type="submit" isIconOnly>
        <FaCheck size={12} />
      </Button>
    </form>
  )
}