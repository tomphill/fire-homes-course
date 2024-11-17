"use client";

import LoginForm from "@/components/login-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSuccess } from "./actions";

export default function LoginModal() {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            You must be logged in to favourite a property
          </DialogDescription>
        </DialogHeader>
        <div>
          <LoginForm
            onSuccess={async () => {
              await loginSuccess();
              router.back();
            }}
          />
        </div>
        <DialogFooter className="block">
          Don&apos;t have an account?
          <Link className="underline pl-2" href="/register">
            Register here.
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
