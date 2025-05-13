import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
type NavbarProps = {
    collapsed: boolean;
    toogleSidebar: () => void;
    
};
export default function Navbar({toogleSidebar,collapsed}: NavbarProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
      <header className={`bg-white shadow-md px-1 py-5 ${collapsed ? 'ml-20' : 'ml-65'}  flex justify-between items-center sticky top-0 z-40`}>
       <div>
        <button onClick={toogleSidebar} className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <Menu color="gray" size={20} />
        </button>
         </div>
        <h1 className="text-lg font-semibold flex-1">Bienvenido {user?.nombre}</h1>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-300 " onClick={()=>{dispatch(logout()); navigate("/login")}}>Cerrar sesión</button>
        </div>
       
      </header>
    );
  }