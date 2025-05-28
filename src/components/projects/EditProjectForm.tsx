import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import type { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/services/ProjectAPI";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const queryCliente = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onSuccess: (res) => {
      // invalidateQueries permite que la información guardada en cache por react-query sea actualizada, realizando una nueva solicitud a la api
      // Si no se usa invalidateQueries, la informacion en Dashboard y EditProject no se va a actualizar con la nueva data de las apis, se queda con la data almacenada en cache
      queryCliente.invalidateQueries({ queryKey: ["projects"] });
      queryCliente.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(res);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = { formData, projectId };
    mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Editar proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el siguiente formulario para editar un proyecto
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer rounded-md transition-colors"
          to="/"
        >
          Volver a projectos
        </Link>
      </nav>

      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm register={register} errors={errors} />
        <input
          type="submit"
          value="Guardar cambios"
          className="bg-fuchsia-700 hover:bg-fuchsia-800 w-full p-3 text-white uppercase font-bold cursor-pointer rounded-md transition-colors"
        />
      </form>
    </div>
  );
}
