import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { checkPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "@/types/index";
import { userSchema } from "@/types/index";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url =  `/auth/create-account`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token: ConfirmToken) {
    try {
        const url =  `/auth/confirm-account`
        const { data } = await api.post<string>(url, token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestNewCode(formData: RequestConfirmationCodeForm) {
    try {
        const url =  `/auth/request-code`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url =  `/auth/login`
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url =  `/auth/forgot-password`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(token: ConfirmToken) {
    try {
        const url =  `/auth/validate-token`
        const { data } = await api.post<string>(url, token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePasswordWithToken({ token, formData }: {token: ConfirmToken['token'], formData: NewPasswordForm}) {
    try {
        const url =  `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const url =  `/auth/user`
        const { data } = await api(url)
        const { success, data: resData } = userSchema.safeParse(data)
        if (success) return resData
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData: checkPasswordForm) {
    try {
        const url =  `/auth/check-pasword`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}