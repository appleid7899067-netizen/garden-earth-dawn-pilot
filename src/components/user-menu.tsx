"use client";

import { UserButton } from "@/lib/auth/gates";

/** Small auth control for the control-room header. */
export function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <UserButton />
    </div>
  );
}
