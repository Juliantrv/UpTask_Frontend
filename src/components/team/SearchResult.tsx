import { addUserToProject } from "@/services/TeamApi"
import type { Project, TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember,
    projectId: Project['_id'],
    reset: () => void
}

export default function SearchResult({ user, projectId, reset }: SearchResultProps) {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            reset()
            queryClient.invalidateQueries({ queryKey: ["projectTeam",projectId] })
            toast.success(data)
        }
    })

  return (
    <>
        <p className="mt-10 text-center font-bold">Resultado:</p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button
                className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                onClick={() => mutate({ projectId, id: user._id })}
            >
                Agreagar al Proyecto
            </button>
        </div>
    </>
  )
}
