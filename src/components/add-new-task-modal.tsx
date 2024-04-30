"use client";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { AddNewTaskForm } from "@/components/add-new-task-form";

export function AddNewTaskModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        variant="bordered"
        color="primary"
      >
       New Task
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
          {(onClose) => <AddNewTaskForm onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  );
}
