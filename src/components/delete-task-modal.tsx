"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { TbTrash } from "react-icons/tb";
import { deleteTask } from "@/actions/delete-task";
import toast from "react-hot-toast";

interface DeleteTaskModalProps {
  title: string
  id: string;
}

export function DeleteTaskModal({
  title,
  id,
}: DeleteTaskModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        isIconOnly
        size="sm"
        color="danger"
        variant="flat"
        className="text-lg"
      >
        <TbTrash />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <form action={() => deleteTask(id)}>
              <ModalHeader className="flex flex-col gap-1">
                Delete Task
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete the &quot{title}&quot?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="primary"
                  onPress={() => {
                    onClose();
                    toast.success(
                      `"${title}" was deleted successfully!`
                    );
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
