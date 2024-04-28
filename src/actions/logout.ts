"use server";
import { signOut } from "@/app/auth/providers";

export async function logout() {
  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}