import { User } from "@/app/ui/profile/InitializeUser";
import { useState } from "react";

export default function Page ({ user }: { user: User }) {
        const [formData, setFormData] = useState({
          fullName: user.fullName || '',
          address: user.address || '',
          phoneNumber: user.phoneNumber || '',
          status: user.status || '',
          avatar: user.avatar || '',
        });
}