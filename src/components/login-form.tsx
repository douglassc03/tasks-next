"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticateUser } from "@/actions/authenticate-user";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@nextui-org/react";

export function LoginForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(authenticateUser, initialState);

  return (
    <form
      action={dispatch}
      className="max-w-lg p-8 bg-zinc-950 text-white rounded-xl flex flex-col justify-center items-center gap-8 md:p-8 md:gap-4"
    >
      <h1 className="text-[1.25rem] font-semibold">
        Welcome back! Please sign in.
      </h1>
      <p className="text-sm">
        Sign in to access your account and manage your tasks.
      </p>

      <div className="w-full flex flex-col gap-4">
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
      <SubmitButton color="primary" style="w-full" title="Sign in" />
      <Link href="forgot-your-password">
        <span className="text-sm text-zinc-400 text-center hover:text-white hover:underline">
          Forgot your password?
        </span>
      </Link>
    </form>
  );
}