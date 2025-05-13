import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

type Register = {
    name: string;
    email: string;
    password: string;
    role: string;
}
export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<Register>();
    const navigate = useNavigate();

    const onSubmit = (data : Register) => {
        console.log(data);
        toast.success("Registro exitoso");
        navigate("/");
      };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nombre completo"
          {...register("name", { required: "El nombre es requerido" })}
          className="border p-2 w-full mb-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: "El correo es requerido" })}
          className="border p-2 w-full mb-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: "La contraseña es requerida" })}
          className="border p-2 w-full mb-2"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <select
          {...register("role", { required: "Selecciona un rol" })}
          className="border p-2 w-full mb-2"
        >
          <option value="">Selecciona un rol</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuario Normal</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          Registrarme
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿Ya tienes cuenta? <Link className="text-blue-600" to="/">Iniciar sesión</Link>
      </p>
    </div>
  )
}
