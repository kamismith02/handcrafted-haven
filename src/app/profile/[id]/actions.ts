import { updateUser } from "@/app/lib/data";
import { State, User } from "@/app/ui/profile/InitializeUser";
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from "next/cache";

export type userForm = {
    id: string;
    full_name: string;
    address: string,
    phone_number: string,
    avatar: string,
    email: string,
    status: string
}

export type formState = {
    errors?: {
        id?: string[];
        full_name?: string[];
        address?: string[];
        email?: string[];
        phone_number?: string[];
        avatar?: string[]
        status?: string[]};
    message: string;
}

export type Seller = {
    id: string;
    shop_name: string;
    avatar: string;
    }

const FormSchema = z.object({
    id: z.string(),
    email: z.string(),
    full_name: z.string(),
    address: z.string(),
    phone_number: z.string(),
    status: z.enum(['user', 'seller']),
    avatar: z.string().url()
})

const UpdateProfile = FormSchema.omit({id: true, status: true})

export async function updateProfile(id: string, prevState: formState, formData: FormData){
    const validatedFields = UpdateProfile.safeParse({
        email: formData.get('email'),
        full_name: formData.get('full_name'),
        address: formData.get('address'),
        phone_number: formData.get('phone_number'),
        avatar: formData.get('avatar'),
        status: formData.get('status')
    })
    if (!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to update profile"
        }
    }

    const { full_name, address, phone_number, avatar} = validatedFields.data;

    try {
        await sql.query(`UPDATE users 
   SET full_name = $1, address = $2, phone_number = $3, avatar = $4 
   WHERE id = $5`,
  [full_name, address, phone_number, avatar, id]);
       
    } catch (error) {
        return {message: `Database Error. Unable to update user. Error: ${error}`}
    }
    revalidatePath(`/profile/${id}`)
    redirect(`/profile/${id}`)
    
}