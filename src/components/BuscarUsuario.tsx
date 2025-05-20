import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";




type UsuarioProps = {
    Nombre: string;
    email: string;
    pass: string;
    Estatus?: number;
    rol: string;
    IdUser?: string;
}
type RegisterProps = {
    usuario: UsuarioProps[];
    onSeleccionar: (usuario: UsuarioProps) => void;
    fetchUsuario: () => void;
    mostrarModal: (visible: boolean) => void;
}

export default function BuscaUsuario({usuario, onSeleccionar,fetchUsuario, mostrarModal} : RegisterProps) {

    const [buscar, setBuscar] = useState<string>("");
    const [paginaActual, setPaginaActual] = useState(1);

    const articulosFiltrados = usuario.filter(a =>
        a.Nombre.toLowerCase().includes(buscar.toLowerCase()) ||
        a.email.toLowerCase().includes(buscar.toLowerCase()) 
      );

      const articulosPorPagina = 5; // Cambia a 10 si quieres
      const indiceInicio = (paginaActual - 1) * articulosPorPagina;
      const indiceFin = indiceInicio + articulosPorPagina;
      let totalPaginas = 0; // Inicializa la variable totalPaginas aquí
      let articulosPaginados = [] as UsuarioProps[]; // Inicializa la variable articulosPaginados aquí
      //paginacion
      if(articulosFiltrados.length === 0) {
         totalPaginas = Math.ceil(usuario.length / articulosPorPagina);
         articulosPaginados = usuario.slice(indiceInicio, indiceFin);
      }else{
      totalPaginas = Math.ceil(articulosFiltrados.length / articulosPorPagina);
      articulosPaginados = articulosFiltrados.slice(indiceInicio, indiceFin);
      }

 // Resetear a página 1 cuando cambia la búsqueda
 useEffect(() => {
    setPaginaActual(1);
  }, [buscar]);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  const onEliminar = (id: string | undefined) => {
    
      //alert(`Usuario eliminado ${usuarioEliminado}`);
     
      api.delete(`/usuarios/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success("Usuario eliminado");
          fetchUsuario();
          
        } else {
          toast.error("Error al eliminar");
        }
      })
    }
  
  return (
    <div className="bg-gray-200  rounded-2xl shadow-2xl">
        <br />
        <label className="text-2xl font-bold text-center">Usuarios</label>
        <br />
        <input type="text" className="border border-gray-300 rounded-lg p-2 w-2xl" 
        placeholder="Buscar Articulo" 
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        />
        
        <br />
        <br />
        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Nombre</th>
                    <th className="border border-gray-200 px-4 py-2">Email</th>
                    <th className="border border-gray-200 px-4 py-2">Rol</th>
                    <th className="border border-gray-200 px-4 py-2">Estatus</th>
                    <th className="border border-gray-200 px-4 py-2">Editar</th>
                </tr>
            </thead>
            <tbody>
                {/* Aquí puedes mapear los datos de los artículos */
                articulosFiltrados.length === 0 ? (

                articulosPaginados.map((articul) => (
                   
                    <tr key={articul.IdUser} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{articul.Nombre}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.email}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.rol}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.Estatus ===1 ? "Activo" : "Inactivo" }</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <button className="bg-blue-600 border rounded-2xl w-20 hover:cursor-pointer "
                             onClick={()=>{onSeleccionar(articul); mostrarModal(true);}}>Editar</button>
                            <button className="bg-red-500 border rounded-2xl w-20 hover:cursor-pointer " onClick={()=>onEliminar(articul.IdUser)}>Eliminar</button>
                            </td>
                    </tr>
                ))
            ) : (
                articulosPaginados.map((articul) => (
                    <tr key={articul.IdUser} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{articul.Nombre}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.email}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.rol}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.Estatus ===1 ? "Activo" : "Inactivo"}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <button className="bg-blue-600 border rounded-2xl w-20 hover:cursor-pointer " onClick={()=>{onSeleccionar(articul); mostrarModal(true);}}>Editar</button>
                            <button className="bg-red-500 border rounded-2xl w-20 hover:cursor-pointer " onClick={()=>onEliminar(articul.IdUser)}>Eliminar</button>
                            </td>
                    </tr>
                )

            )
        )    
                }
            </tbody>
        </table>

        <div className="flex justify-center gap-2 mt-4">
  <button
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    onClick={() => setPaginaActual(paginaActual - 1)}
    disabled={paginaActual === 1}
  >
    Anterior
  </button>
  <span className="px-4 py-2">Página {paginaActual} de {totalPaginas}</span>
  <button
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    onClick={() => setPaginaActual(paginaActual + 1)}
    disabled={paginaActual === totalPaginas}
  >
    Siguiente
  </button>
</div>
    </div>
  )
}
