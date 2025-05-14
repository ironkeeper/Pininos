import { FieldError, UseFormRegister } from "react-hook-form"
import { useEffect } from "react";

//se vuelve hacer el type register

type Register = {
  Nombre: string;
  email: string;
  pass: string;
  rol: string;
  IdUser?: string;
}
//hacemos los types del formulario hook
type Props ={
  register: UseFormRegister<Register>;
  reset : (values?: Partial<Register>) => void;
  errors: {
    Nombre?: FieldError;
    email?: FieldError;
    pass?: FieldError;
    rol?: FieldError;
    IdUser?: FieldError;
  }
  handleSubmit: (onSubmit: (data: Register) => void) => (event?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: Register) => void;
  usuarioSeleccionado: Register | null;
}



export default function RegisterForm({ register,reset, errors, handleSubmit, onSubmit, usuarioSeleccionado} : Props ) {


  useEffect(() => {
    console.log("Usuario recibido:", usuarioSeleccionado);
    if (usuarioSeleccionado) {
      reset(usuarioSeleccionado); // pasa los datos del usuario seleccionado al formulario
    }else{
      reset() // limpia el formulario
    }
  }, [usuarioSeleccionado, reset]);



  return (
    <div className="p-8 max-w-md mx-auto">
    <h2 className="text-2xl mb-4">{usuarioSeleccionado ? "Editar Usuario" : "Registro de Usuario"}</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type="hidden" className="border p-3 w-3xl mb-2"
        {...register("IdUser")} />
      <input
        type="text"
        placeholder="Nombre completo"
        {...register("Nombre", { required: "El nombre es requerido" })}
        className="border p-2 w-full mb-2"
      />
      {errors.Nombre && <p className="text-red-500">{errors.Nombre.message}</p>}

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
        {...register("pass", { required: "La contraseña es requerida" })}
        className="border p-2 w-full mb-2"
      />
      {errors.pass && <p className="text-red-500">{errors.pass.message}</p>}

      <select
        {...register("rol", { required: "Selecciona un rol" })}
        className="border p-2 w-full mb-2"
      >
        <option value="">Selecciona un rol</option>
        <option value="admin">Administrador</option>
        <option value="user">Usuario Normal</option>
      </select>
      {errors.rol && <p className="text-red-500">{errors.rol.message}</p>}

      <button type="submit" className="bg-green-500 text-white p-2 w-full">
        { usuarioSeleccionado ? "Editar Registro" : "Registrar"}
      </button>
    </form>


  </div>
  )
}
