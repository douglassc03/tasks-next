import { Input, Button } from "@nextui-org/react";
import { AddNewTaskModal } from "@/components/add-new-task-modal";
import { IoIosSearch } from "react-icons/io";

export default function Home() {
  return (
    <div className="flex m-auto justify-center py-12 px-8 max-w-5xl min-h-[calc(100vh-4.125rem)]">
      <div className="flex gap-8 justify-between w-full">
        <form className="flex gap-2 w-full">
          <Input fullWidth className="max-w-xl" />
          <Button isIconOnly>
            <IoIosSearch size={18} />
          </Button>
        </form>
        <AddNewTaskModal />
      </div>
    </div>
  );
}
