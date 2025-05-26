import type { ConfirmToken, NewPasswordForm } from "@/types/index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/services/AuthApi";
import { toast } from "react-toastify";

type NewPasswordFormPropos = {
  token: ConfirmToken['token'],
}

export default function NewPasswordForm({ token }: NewPasswordFormPropos) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      reset()
      toast.success(data)
      navigate('/auth/login')
    }
  })

  const handleNewPassword = (formData: NewPasswordForm) => mutate({ token, formData });

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(handleNewPassword)}
      className="space-y-8 p-10  bg-white mt-10 rounded-lg"
      noValidate
    >
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Password de Registro"
          className="w-full p-3  border-gray-300 border"
          {...register("password", {
            required: "El Password es obligatorio",
            minLength: {
              value: 8,
              message: "El Password debe ser mínimo de 8 caracteres",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="password_confirmation">
          Repetir Password
        </label>

        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full p-3  border-gray-300 border"
          {...register("password_confirmation", {
            required: "Repetir Password es obligatorio",
            validate: (value) =>
              value === password || "Los Passwords no son iguales",
          })}
        />

        {errors.password_confirmation && (
          <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Establecer Contraseña"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-sm"
      />
    </form>
  );
}
