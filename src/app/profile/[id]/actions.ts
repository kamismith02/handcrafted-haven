import { updateUser } from "@/app/lib/data";
import { State, User } from "@/app/ui/profile/InitializeUser";
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    address: z.string(),
    phoneNumber: z.string(),
    status: z.enum(['user', 'seller'])
})

const UpdateProfile = FormSchema.omit({id: true, status: true})

export async function updateProfile(id: string, formData: FormData){
    // Add validation from the Registration form
    const validatedFields = UpdateProfile.safeParse({
        fullName: formData.get('fullName'),
        address: formData.get('address'),
        phoneNumber: formData.get('address')
    })
    if (!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to update invoice"
        }
    }

    const { fullName, address, phoneNumber} = validatedFields.data;

    try {
        const query = await updateUser(id, fullName, address, phoneNumber);
        if (query == false){
             {
                alert('Error: No changes made')
            }
        } else {
            redirect(`/profile/${id}`)
        }
    } catch (error) {
        alert(`Database Error.  Unable to update user.`)
    }
    
}