import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in - Task Manager",
  description:
    "Sign in to manage, add or update your tasks.",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)] background">
      <LoginForm />
    </div>
  );
}