import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { Project, TeamMember, TeamMemberForm } from "@/types/index";
import { teamMemberSchema, teamMembersSchema } from "@/types/index";

export async function findUserByEmail({projectId, formData}: { projectId: Project['_id'], formData: TeamMemberForm }) {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        const { success, data: schemaData } = teamMemberSchema.safeParse(data)
        if(success) return schemaData
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({projectId, id}: { projectId: Project['_id'], id: TeamMember['_id'] }) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api(url)
        const { success, data: schemaData } = teamMembersSchema.safeParse(data)
        if(success) return schemaData
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromProject({projectId, userId}: { projectId: Project['_id'], userId: TeamMember['_id'] }) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}