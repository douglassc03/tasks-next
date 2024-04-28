import { SignUpForm } from "@/components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Task Manager",
  description:
    "Sign up for a new account on Task Manager. Create a new account to manage your tasks and projects.",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center py-16 min-h-[calc(100vh-12rem)] background">
      <SignUpForm />
    </div>
  );
}
