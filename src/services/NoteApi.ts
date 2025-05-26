import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { Note, NoteFormData, Project, Task } from "@/types/index";

type NoteApi = {
    projectId: Project['_id'];
    taskId: Task['_id'];
    formData: NoteFormData;
    noteId: Note['_id']
}

export async function createNote({ projectId, taskId, formData }: Pick<NoteApi, 'projectId'|'taskId'|'formData'>) {
    try {
        const url =  `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteApi, 'projectId'|'taskId'|'noteId'>) {
    try {
        const url =  `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}