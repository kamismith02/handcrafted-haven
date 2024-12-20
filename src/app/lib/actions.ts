"use server";
import { signIn } from "next-auth/react";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      ...formData,
    });

    if (result?.error) {
      switch (result.error) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    return "Logged in successfully"; 
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return "An error occurred.";
    }
    throw error;
  }
}
