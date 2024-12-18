"use server";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";


export async function registerUser(state, formData) {
    const validatedFields = z
      .object({
        full_name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
      })
      .safeParse({
        full_name: formData.get("full-name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm-password"),
      });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Register User.",
      };
    }
  
    const { full_name, email, password, confirmPassword } = validatedFields.data;
  
    if (password !== confirmPassword) {
      return {
        errors: { confirmPassword: ["Passwords do not match."] },
        message: "Passwords do not match. Failed to Register User.",
      };
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      await sql`
        INSERT INTO users (full_name, email, password)
        VALUES (${full_name}, ${email}, ${hashedPassword})
      `;
    } catch (error) {
      return { message: "Database Error: Failed to Register User." };
    }
  
    revalidatePath("/login");
    redirect("/login");
  }
  
  
  