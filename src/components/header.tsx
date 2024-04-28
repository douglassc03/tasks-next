import Link from "next/link";
import { auth } from "@/app/auth/providers";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { UserProfile } from "./user-profile";

export async function Header() {
  const session = await auth();

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          TM
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {session?.user ? (
          <UserProfile
            firstName={session?.user?.firstName}
            lastName={session?.user?.lastName}
          />
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/auth/sign-in"
                className="transition hover:text-gray-500"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/sign-up"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
