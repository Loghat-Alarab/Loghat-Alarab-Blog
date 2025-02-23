import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChevronsUpDown, LogOut, CircleUserRound } from "lucide-react";

import Link from "next/link";

import { api } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserButton = async () => {
  const session = await api.getSession({
    headers: await headers(),
  });

  if (session)
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger dir="ltr" asChild>
            <Button
              variant="secondary"
              size="lg"
              className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session.user.image ?? ""}
                  alt={session.user.name}
                />
                <AvatarFallback className="rounded-lg">
                  <CircleUserRound />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session.user.name}
                </span>
                {/* <span className="truncate text-xs">{session.user.email}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session.user.image ?? ""}
                    alt={session.user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    <CircleUserRound />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs">{session.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" dir="rtl">
              <form
                action={async () => {
                  "use server";
                  const res = await api.signOut({
                    headers: await headers(),
                  });

                  if (res.success) redirect("/auth/login");
                }}
              >
                <button
                  type="submit"
                  className="font-bold flex gap-2 px-2 py-1.5 cursor-pointer"
                >
                  <LogOut />
                  تسجيل الخروج
                </button>
              </form>
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="cursor-pointer" dir="rtl">
              <LogOut />
              تسجيل الخروج
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  else
    return (
      <>
        <Button variant="outline" asChild>
          <Link href="/auth/login">تسجيل الدخول</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/register">إنشاء حساب</Link>
        </Button>
      </>
    );
};
export default UserButton;
