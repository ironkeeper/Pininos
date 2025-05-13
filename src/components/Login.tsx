import {  useForm } from "react-hook-form";
import { toast } from "react-toastify"
import { useNavigate, Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import axios from "axios";

type Format={
    email: string;
    password?: string;
    rol: string;
    nombre: string;
    id?: number;

}
export default function Login() {
    const { register, handleSubmit, formState: { errors  } } = useForm<Format>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data : Format) => {
        const url =`http://127.0.0.1:8000/usuario/${data.email}/${data.password}/`
      const api = axios.create({
        baseURL: url,
       
      })
      
      api.get("/").then((res) => {
        console.log(res.data);
        
        if (res.data === null) {
          toast.error("Usuario o contraseña incorrectos");
          return;
        }
        const user = res.data;
        dispatch(login({ email: user.email, nombre: user.Nombre, rol: user.rol, id: user.IdUser }));
         toast.success("Inicio de sesión exitoso");
         navigate("/articulos");

       });
   
       
      };

  return (
    <div className ="p-8 max-w-md mx-auto border rounded-4xl shadow-md bg-white mt-20">
       <h2 className="text-2xl mb-4">Login</h2>
<form onSubmit={handleSubmit(onSubmit)} className="mb-4">
    <input type="text" 
     id="email"
     {...register("email", { required: "el correo es necesario" })}
     className="border p-2 w-full mb-2"
    placeholder="email"/>
    { errors.email && <span className="text-red-500">{errors.email.message}</span>}


    <input type="password" 
     id="password"
     {...register("password", { required: "la contraseña es necesaria" })}
     className="border p-2 w-full mb-2"
    placeholder="password"/>
     {errors.password && <p className="text-red-500">{errors.password.message}</p>}
     <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Iniciar sesión
        </button>
</form>

<p className="mt-4 text-center">
        ¿No tienes cuenta? <Link className="text-blue-600" to="/register">Regístrate</Link>
      </p>

    </div>
  )
}
