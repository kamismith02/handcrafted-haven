"use server";
import { signIn } from "next-auth/react";  // Corrigindo a importação
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", {
      redirect: false,  // Evita o redirecionamento automático
      ...formData,      // Dados do formulário de login
    });

    if (result?.error) {
      switch (result.error) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    return "Logged in successfully"; // Se não houver erro, a autenticação foi bem-sucedida
  } catch (error) {
    // Tratar o erro genérico
    if (error instanceof Error) {
      console.error(error.message); // Log de erro
      return "An error occurred.";
    }
    throw error;  // Caso seja um erro desconhecido
  }
}
