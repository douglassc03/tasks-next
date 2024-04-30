import { useFormState } from "react-dom";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { createNewTask } from "@/actions/create-new-task";
import { FormError } from "@/components/form-error";
import { useEffect } from "react";
import { SubmitButton } from "@/components/submit-button";

export function AddNewTaskForm({ onClose }: { onClose: () => void }){
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createNewTask, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [onClose, state.success]);

  return (
    <form action={dispatch}>
      <ModalHeader className="flex flex-col gap-1">Create a new Task</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Task's Title"
          placeholder="Enter the title of the task"
          variant="bordered"
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
          placeholder="Enter the date of the task, e.g. 2024-04-29"
          variant="bordered"
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
          placeholder="Enter the duration in minutes of the task"
          variant="bordered"
          name="duration"
          type="number"
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
