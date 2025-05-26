import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import type { Project, Task, TaskFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/services/TaskApi";
import { toast } from "react-toastify";

type EditTaskModalProps = {
  taskId: Task['_id']
  projectId: Project['_id'];
  data: Task;
};
export default function EditTaskModal({ taskId, data, projectId }: EditTaskModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      queryClient.invalidateQueries({ queryKey: ["deatilProject", projectId] })
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true })
    }
  })

  const handelEditTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId,
      taskId
    }
    mutate(data)
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <DialogTitle as="h3" className="font-black text-4xl  my-5">
                  Editar Tarea
                </DialogTitle>

                <p className="text-xl font-bold">
                  Realiza cambios a una tarea en {""}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form 
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(handelEditTask)}
                >
                  <TaskForm 
                    register={register}
                    errors={errors}
                  />
                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value="Guardar Tarea"
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
