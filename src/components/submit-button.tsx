import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { Loading } from "./loading";

interface ISubmitButtonProps {
  title: string;
  style?: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

export function SubmitButton({ title, style, color }: ISubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button className={style} color={color} type="submit" disabled={pending}>
      {pending ? <Loading /> : title}
    </Button>
  );
}