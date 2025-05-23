import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
//mport { useNavigate} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";

import BuscaUsuario from "./BuscarUsuario";

type Register = {
  Nombre: string;
  email: string;
  pass: string;
  Estatus?: number;
  rol: string;
  IdUser?: string;
}


export default function Register() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Register>();
    //const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [usuario, setUsuario] = useState<Register[]>([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Register | null>(null);
    

      const api = axios.create({
            baseURL: "http://127.0.0.1:8000/",
          });



const fetchUsuario = () => {
    api.get("/usuarios").then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setUsuario(res.data);
        } 
      })
      .catch((error) => { 
        console.error(error);
      }
      );
}

useEffect(() => {
  fetchUsuario();
},[]);  






    const onSubmit = (data : Register) => {
    if (usuarioSeleccionado) {
      console.log(usuarioSeleccionado);
      api.put(`/usuarios/${usuarioSeleccionado.IdUser}`, data)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            toast.success("Usuario actualizado");
            setMostrarModal(false);
            setUsuarioSeleccionado(null);
            fetchUsuario();
            reset({
        Nombre: "",
        email: "",
        pass: "",
        rol: "",
        Estatus: 1,
        IdUser: ""
      });
          } else {
            toast.error("Error al actualizar");
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 400) {
            toast.error("Error en los datos enviados");
          } else {
            toast.error("Error al actualizar");
          }
        }); 


      
    }else{  
        console.log(data);
    api.post("/usuarios", data)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success("Registro exitoso");
          setMostrarModal(false);
          fetchUsuario();
           reset({
        Nombre: "",
        email: "",
        pass: "",
        rol: "",
        Estatus: 1,
        IdUser: ""
      });
        } else {
          toast.error("Error al registrar");
        }
      }
      )
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          toast.error("Error en los datos enviados");
        } else {
          toast.error("Error al registrar");
        }
      }
      );    
    } 
      };

  return (
   <div className="p-8 ml-[200px]">
    <button
        className="bg-blue-500 text-white  px-4 py-2 rounded"
        onClick={() => { 
          reset();
          setUsuarioSeleccionado(null);
          setMostrarModal(true);
        }}
      >
        Agregar Usuario
      </button>
      <br />
      <BuscaUsuario 
      usuario={usuario} 
      onSeleccionar={(item)=> setUsuarioSeleccionado(item) } 
      fetchUsuario={fetchUsuario}
      mostrarModal={setMostrarModal}
      />
      <br />

{ mostrarModal &&  (

    <Modal title={usuarioSeleccionado ? "Editar Usuario":"Agregar Usuario"} 
    onClose={() => {
      reset({
        Nombre: "",
        email: "",
        pass: "",
        rol: "",
        Estatus: 1,
        IdUser: ""
      });
      setUsuarioSeleccionado(null); 
      setMostrarModal(false);}}>

   <RegisterForm
    register={register}
    handleSubmit={handleSubmit}
    errors={errors}
    onSubmit={onSubmit}
    usuarioSeleccionado={usuarioSeleccionado}
    reset={reset}
   
   />

</Modal>

   )
}





   </div>
  )
}
