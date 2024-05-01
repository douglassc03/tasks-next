"use client";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { PiPencilLine } from "react-icons/pi";
import { EditTaskForm } from "@/components/edit-task-form";
import { Task } from "@prisma/client";

interface ITask {
  task: Task;
}

export function EditTaskModal({ task }: ITask) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        isIconOnly
        size="sm"
        variant="flat"
        className="text-lg text-default-500"
      >
        <PiPencilLine />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="lg"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => <EditTaskForm task={task} onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  );
}
