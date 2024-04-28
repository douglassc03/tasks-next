import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Card,
  CardBody,
} from "@nextui-org/react";
import {
  LuSettings,
  LuUserCircle,
  LuHelpCircle,
  LuKeyRound,
} from "react-icons/lu";
import Link from "next/link";
import { UserLogout } from "./user-logout";

interface UserProfileProps {
  firstName: string;
  lastName: string;
}

export function UserProfile({
  firstName,
  lastName,
}: UserProfileProps) {
  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User
          as="button"
          name={`${firstName} ${lastName}`}
          className="transition-transform text-ellipsis whitespace-nowrap overflow-hidden"
          avatarProps={{
            radius: "full",
            name: firstName[0] + lastName[0],
            color: "primary",
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Card
          shadow="none"
          className="max-w-[300px] min-w-44 border-none bg-transparent"
        >
          <CardBody className="p-2">
            <Link
              href="/user/edit-profile/change-your-password"
              className="flex items-center gap-2 text-left rounded-lg px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-700"
            >
              <LuUserCircle />
              Edit profile
            </Link>
            <Link
              href="user/settings"
              className="flex items-center gap-2 text-left rounded-lg px-4 py-2 transition hover:bg-blue-100 hover:text-blue-700"
            >
              <LuSettings />
              Settings
            </Link>
            <Link
              href="/help-and-feedback"
              className="flex items-center gap-2 text-left rounded-lg px-4 py-2 transition hover:bg-blue-100 hover:text-blue-700"
            >
              <LuHelpCircle />
              Help & Feedback
            </Link>
            <UserLogout />
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
