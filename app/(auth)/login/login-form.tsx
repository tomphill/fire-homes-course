"use client";

import { useRouter } from "next/navigation";
import CommonLoginForm from "@/components/login-form";

export default function LoginForm() {
  const router = useRouter();

  return (
    <CommonLoginForm
      onSuccess={() => {
        router.refresh();
      }}
    />
  );
}
