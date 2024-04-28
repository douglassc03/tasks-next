import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
  errorMessage?: string
}

export function FormError({errorMessage}: FormErrorProps) {
  return (
    <div className="flex gap-2 p-2 items-center bg-red-500/10 rounded-xl">
      <span className="text-red-500">
        <BsExclamationTriangle className="w-4 h-4 text-sm" />
      </span>
      <p className="text-red-500 text-sm">
        {errorMessage}
      </p>
    </div>
  );
}