import { useForm  } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../store";
import axios from "axios";
import BuscaArticulos from "./BuscaArticulos";
import { useEffect } from "react";
import { useState } from "react";

type RegisterProps = {
    Articulo: string;
    IdArticulo?: string;
    descripcion: string;
    Tipo: number;
    Cantidad: number;
    IdUser: number;

}

export default function Articulos() {
     const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterProps>();
     const user = useSelector((state: RootState) => state.auth.user);
     const [articulo,setArticulo] = useState<RegisterProps[]>([]);
     const [articuloSeleccionado, setArticuloSeleccionado] = useState<RegisterProps | null>(null);
      const [articuloEliminado, setArticuloEliminado] = useState<string| undefined>(undefined);
      const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
       fetchActualiza()
    },[]);

    useEffect(() => {
      if (articuloSeleccionado) {
        reset(articuloSeleccionado);
      }
    }, [articuloSeleccionado, reset]);

    const fetchActualiza = ()=>{
      const api = axios.create({
        baseURL: "http://127.0.0.1:8000/",})

      api.get("/articulis").then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          
          setArticulo(res.data);
        } 
      }).catch((error) => {
        console.error(error);
      }
      )
    }
    const submit = (data: RegisterProps) => {
      if(user) 
        { data.IdUser = user.id }
      else{ data.IdUser = 0}
        console.log(data);
      const api = axios.create({
        baseURL: "http://127.0.0.1:8000/",
      });
     
      if(articuloSeleccionado) {
        api.put(`/articulis/${articuloSeleccionado.IdArticulo}`, data).then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            toast.success("Articulo actualizado exitosamente");
            fetchActualiza()
            reset({
              Articulo: "",
              IdArticulo: "",
              descripcion: "",
              Tipo: 0,
              Cantidad: 0,
              IdUser: 0});
            setArticuloSeleccionado(null);
          } else {
            toast.error("Error al actualizar el articulo");
          }
        }).catch((error) => { 
          console.error(error);
        } 
      )

      }else{
      api.post("/articulo", data).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success("Articulo agregado exitosamente");
          fetchActualiza()
          reset();
        } else {
          toast.error("Error al agregar el articulo");
        }
      }).catch((error) => { 
        console.error(error);
      } 
    )
  }    
 
    }

useEffect(() => {
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  })

  if(articuloEliminado) {
    alert("¿Estás seguro de que deseas eliminar este artículo?")
    api.delete(`/articulis/${articuloEliminado}`).then((res) => {
    console.log(res.data);
    if (res.status === 200) {
      toast.success("Articulo eliminado exitosamente");   
      fetchActualiza()
      reset({
        Articulo: "",
        IdArticulo: "",
        descripcion: "",
        Tipo: 0,
        Cantidad: 0,
        IdUser: 0});
      setArticuloEliminado(undefined); 
    }}).catch((error) => {
      console.error(error);

    })

      }

},[ articuloEliminado,reset])


  return (
    <div className=" grid grid-cols-2 gap-9 p-8  ml-70 rounded shadow-md mt-20">
      <div className=" flex bg-amber-50 justify-center  rounded shadow-md p-4">
        <form onSubmit={handleSubmit(submit)} className="mb-4">
        <h2 className="text-5xl">Articulos</h2> 
        <button className="rounded-2xl bg-amber-500"
        onClick={() => setMostrarModal(true)}
        >Modal</button>
        <br />
        <input type="hidden" className="border p-3 w-3xl mb-2"
        {...register("IdArticulo")} />
        <label htmlFor="" className="text-2xl">Articulo</label>
        <br />
        <input type="text" className="border p-3 w-3xl mb-2"
        {...register("Articulo", { required: "El nombre es requerido" })}
        placeholder="Articulo" />
         {errors.Articulo && <p className="text-red-500">{errors.Articulo.message}</p>}
<br />
        <label htmlFor="" className="text-2xl">Descripcion</label>
        <br />
        <input type="text" className="border p-3 w-3xl mb-2"
         {...register("descripcion", { required: "La descripción es requerido" })}
        placeholder="Descripcion" />
        {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
<br />
        <label htmlFor="" className="text-2xl">Tipo</label>
        <br />
        <select className="border p-3 w-3xl mb-2"
        {...register("Tipo", { required: "Selecciona un tipo" })}>
            <option value="Electronico">Electronico</option>
            <option value="Papeleria">Papeleria</option>
            <option value="frutas">Frutas</option>
        </select>
        {errors.Tipo && <p className="text-red-500">{errors.Tipo.message}</p>}
<br />
        <label htmlFor="" className="text-2xl">Cantidad</label>
        <br />
        <input type="number" className="border p-3 w-3xl mb-2" 
        {...register("Cantidad", { required: "La cantidad es requerida" })}
        placeholder="Cantidad"/>
        {errors.Cantidad && <p className="text-red-500">{errors.Cantidad.message}</p>}
<br />
  <button className="bg-blue-500 mt-3 text-white p-3 w-3xl">{articuloSeleccionado ? "Guardar Cambios" : "Agregar"}</button>
 <br />
 { articuloSeleccionado && (
    <button  className="bg-red-500 mt-3 text-white p-3 w-3xl hover:cursor-pointer" onClick={() => { setArticuloSeleccionado(null); reset({
      Articulo: "",
      IdArticulo: "",
      descripcion: "",
      Tipo: 0,
      Cantidad: 0,
      IdUser: 0
  
  }); }}>Cancelar</button>
)}
  </form>
  </div>
  
  <div className="items-center">
  <BuscaArticulos articulo ={articulo} 
  onSeleccionar={(item)=> setArticuloSeleccionado(item) } 
  onEliminar={(id)=>setArticuloEliminado(id)}  />
  </div>
{ /*modal----------------------------------*/}

{
mostrarModal &&  (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Editar Artículo</h2>

      <label className="block mb-2">Nombre:</label>
      <input
        type="text"
        className="w-full border rounded p-2 mb-4"
       
        
      />

      <label className="block mb-2">Descripción:</label>
      <input
        type="text"
        className="w-full border rounded p-2 mb-4"
       
      />

      {/* Agrega más campos si deseas */}

      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-400 px-4 py-2 rounded"
          onClick={() => setMostrarModal(false)}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
)}





{/* fin del modal------------------ */}
    </div>
    
  )
}
