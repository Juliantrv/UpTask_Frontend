import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { type TaskFormData, type Project, type Task, taskSchema } from "@/types/index";

type TaskApi = {
    formData: TaskFormData; 
    projectId: Project['_id'];
    taskId: Task['_id'];
    status: Task['status'];
}
export async function createTask({formData, projectId}: Pick<TaskApi, 'formData'|'projectId'>) {
    try {
        const url =  `/projects/${projectId}/task`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({projectId, taskId}: Pick<TaskApi,'projectId'|'taskId'>) {
    try {
        const url =  `/projects/${projectId}/task/${taskId}`
        const { data } = await api.get(url)
        const { success, data: resp} = taskSchema.safeParse(data)
        if(success) return resp
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({projectId, taskId, formData}: Pick<TaskApi,'projectId'|'taskId'|'formData'>){
    try {
        const url =  `/projects/${projectId}/task/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectId, taskId}: Pick<TaskApi,'projectId'|'taskId'>) {
    try {
        const url =  `/projects/${projectId}/task/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatusTask({projectId, taskId, status}: Pick<TaskApi,'projectId'|'taskId'|'status'>) {
    try {
        const url =  `/projects/${projectId}/task/${taskId}/status`
        const { data } = await api.post<string>(url, { status })
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}