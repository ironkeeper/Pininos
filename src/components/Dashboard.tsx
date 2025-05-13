import { Link } from "react-router-dom";
//import { logout } from "../store/slices/authSlice";
import {  useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";



export default function Dashboard() {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

   

    if (!user) {
        return (
            <div className="p-8 max-w-2xl mx-auto rounded bg-amber-100 shadow-md mt-20">
                <h2 className="text-4xl mb-4">Acceso denegado</h2>
                <p className="mb-6 text-2xl">No tienes acceso a esta página.</p>
                <Link className="bg-red-500 text-white p-2" to="/login">Iniciar sesión</Link>
            </div>
        )
    }

  return (
    <div className="p-8 max-w-2xl mx-auto">
    <h2 className="text-3xl mb-4">Bienvenido al Dashboard</h2>
    <p className="mb-6">{ user.email}</p>
    <p className="mb-6">{ user.rol}</p>

    <Link className="bg-red-500 text-white p-2" onClick={()=>dispatch(logout())} to="/login">Cerrar sesión</Link>
  </div>
  )
}
