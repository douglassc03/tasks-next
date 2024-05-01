import { useFormState } from "react-dom";
import { editTask } from "@/actions/edit-task";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { Task } from "@prisma/client";
import { useEffect } from "react";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";


interface EditTaskFormProps {
  onClose: () => void;
  task: Task;
}

export function EditTaskForm({ onClose, task }: EditTaskFormProps) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editTask, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [onClose, state.success]);

  return (
    <form action={dispatch}>
      <ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
      <ModalBody>
        <input type="hidden" name="id" value={task.id} />

        <Input
          autoFocus
          label="Title"
          placeholder="Enter the title of the task"
          variant="bordered"
          defaultValue={task.title}
          name="title"
        />
        {state.errors?.title &&
          state.errors.title.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
        <Input
          label="Description"
          placeholder="Enter the description of the task"
          variant="bordered"
          defaultValue={task.description}
          name="description"
        />
        {state.errors?.description &&
          state.errors.description.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
        <Input
          label="Date"
          placeholder="Enter the date of the task. Format: YYYY-MM-DD"
          variant="bordered"
          defaultValue={task.date.toISOString().split("T")[0]}
          name="date"
        />
        {state.errors?.date &&
          state.errors.date.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}

        <Input
          label="Duration"
          placeholder="Enter the duration of the task in minutes"
          variant="bordered"
          defaultValue={task.duration.toString()}
          name="duration"
        />
        {state.errors?.duration &&
          state.errors.duration.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </ModalBody>
      <ModalFooter>
        {state.success === false && <FormError errorMessage={state.message} />}
        <Button type="reset" color="danger" variant="flat">
          Reset
        </Button>
        <SubmitButton title="Confirm" color="primary" />
      </ModalFooter>
    </form>
  );
}
