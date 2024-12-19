"use server";
import { z } from "zod";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const response = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (response?.error) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  redirect("/products");
}

export async function logout() {
  await signOut({ callbackUrl: "/login" });
  redirect("/login");
}
