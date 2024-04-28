"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createUser } from "@/actions/create-user";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@nextui-org/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function SignUpForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
  }, [state?.success, state?.message]);

  return (
    <form
      action={dispatch}
      className="max-w-lg p-8 bg-zinc-950 text-white rounded-xl flex flex-col justify-center items-center gap-8 md:p-8 md:gap-4"
    >
      <h1 className="text-[1.25rem] font-semibold">
        Hi, nice to meet you! Here you can sign up.
      </h1>
      <p className="text-sm">
        Create your account to manage your tasks and projects.
      </p>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            className="w-full"
          />
          {state?.errors?.firstName?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div> <div className="flex flex-col gap-2">
          <Input
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            className="w-full"
          />
          {state?.errors?.lastName?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            name="email"
            label="E-mail"
            placeholder="Enter your email address"
            className="w-full"
          />
          {state?.errors?.email?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            className="w-full"
          />
          {state?.errors?.password?.map((error) => (
            <span
              key={error}
              aria-live="polite"
              className="text-red-500 text-sm"
            >
              {error}
            </span>
          ))}
        </div>
      </div>
      {state?.success === false && <FormError errorMessage={state.message} />}
      <SubmitButton color="primary" style="w-full" title="Sign up" />
    </form>
  );
}