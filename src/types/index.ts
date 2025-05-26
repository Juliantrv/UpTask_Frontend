import { array, object, string, z } from "zod";

// Auth & Users
const authSchema = object({
    name: string(),
    email: string().email(),
    current_password: string(),
    password: string(),
    password_confirmation: string(),
    token: string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email'|'password'>
export type UserRegistrationForm = Pick<Auth, 'name'|'email'|'password'|'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type ConfirmToken = Pick<Auth, 'token'>
export type NewPasswordForm = Pick<Auth, 'password'|'password_confirmation'>
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'password'|'password_confirmation'|'current_password'>
export type checkPasswordForm = Pick<Auth, 'password'>

// Users
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: string()
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'email'|'name'>

// Notes
export const noteSchema = object({
    _id: string(),
    content: string(),
    createdBy: userSchema,
    task: string(),
    createdAt: string()
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

// Task
export const taskStatusSchema = z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = object({
    _id: string(),
    name: string(),
    description: string(),
    project: string(),
    status: taskStatusSchema,
    completedBy: array(object({
        _id: string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    notes: array(noteSchema),
    createdAt: string(),
    updatedAt: string(),
})

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status:true
})
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name'|'description'> 
export type TaskProject = z.infer<typeof taskProjectSchema>

// Projects
export const projectSchema = object({
    _id: string(),
    clientName: string(),
    projectName: string(),
    description: string(),
    manager: string(userSchema.pick({_id: true})),
    tasks: array(taskProjectSchema),
    team: array(string(userSchema.pick({ _id: true })))
})
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)
export const editProjectSchema = projectSchema.pick({
    clientName: true,
    projectName: true,
    description: true
})
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName'|'projectName'|'description'>

// Team
export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})
export const teamMembersSchema = array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>