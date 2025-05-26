import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { UpdateCurrentUserPasswordForm, UserProfileForm } from "@/types/index";

export async function updateProfile(formData: UserProfileForm) {
    try {
        const url =  `/auth/profile`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {
        const url =  `/auth/update-pasword`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}