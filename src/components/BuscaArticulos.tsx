import { useState, useEffect } from "react";




type ArticulosProps = {
    Articulo: string;
    IdArticulo?: string;
    descripcion: string;
    Tipo: number;
    Cantidad: number;
    IdUser: number;
}
type RegisterProps = {
    articulo: ArticulosProps[];
    onSeleccionar: (articulo: ArticulosProps) => void;
    onEliminar: (id : string | undefined) => void;
}

export default function BuscaArticulos({articulo, onSeleccionar, onEliminar} : RegisterProps) {

    const [buscar, setBuscar] = useState<string>("");
    const [paginaActual, setPaginaActual] = useState(1);

    const articulosFiltrados = articulo.filter(a =>
        a.Articulo.toLowerCase().includes(buscar.toLowerCase()) ||
        a.descripcion.toLowerCase().includes(buscar.toLowerCase()) 
      );

      const articulosPorPagina = 5; // Cambia a 10 si quieres
      const indiceInicio = (paginaActual - 1) * articulosPorPagina;
      const indiceFin = indiceInicio + articulosPorPagina;
      let totalPaginas = 0; // Inicializa la variable totalPaginas aquí
      let articulosPaginados = [] as ArticulosProps[]; // Inicializa la variable articulosPaginados aquí
      //paginacion
      if(articulosFiltrados.length === 0) {
         totalPaginas = Math.ceil(articulo.length / articulosPorPagina);
         articulosPaginados = articulo.slice(indiceInicio, indiceFin);
      }else{
      totalPaginas = Math.ceil(articulosFiltrados.length / articulosPorPagina);
      articulosPaginados = articulosFiltrados.slice(indiceInicio, indiceFin);
      }

 // Resetear a página 1 cuando cambia la búsqueda
 useEffect(() => {
    setPaginaActual(1);
  }, [buscar]);

  return (
    <div className="bg-gray-200  rounded-2xl shadow-2xl">
        <br />
        <label className="text-2xl font-bold text-center">Articulos</label>
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
                    <th className="border border-gray-200 px-4 py-2">Articulo</th>
                    <th className="border border-gray-200 px-4 py-2">Descripcion</th>
                    <th className="border border-gray-200 px-4 py-2">Tipo</th>
                    <th className="border border-gray-200 px-4 py-2">Cantidad</th>
                    <th className="border border-gray-200 px-4 py-2">Editar</th>
                </tr>
            </thead>
            <tbody>
                {/* Aquí puedes mapear los datos de los artículos */
                articulosFiltrados.length === 0 ? (

                articulosPaginados.map((articul) => (
                   
                    <tr key={articul.IdArticulo} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{articul.Articulo}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.descripcion}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.Tipo}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.Cantidad}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <button className="bg-blue-600 border rounded-2xl w-20 hover:cursor-pointer " onClick={()=>onSeleccionar(articul)}>Editar</button>
                            <button className="bg-red-500 border rounded-2xl w-20 hover:cursor-pointer " onClick={()=>onEliminar(articul.IdArticulo)}>Eliminar</button>
                            </td>
                    </tr>
                ))
            ) : (
                articulosPaginados.map((articul) => (
                    <tr key={articul.IdArticulo} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{articul.Articulo}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.descripcion}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.Tipo}</td>
                        <td className="border border-gray-200 px-4 py-2">{articul.Cantidad}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <button className="bg-blue-600 border rounded-2xl w-20 hover:cursor-pointer " onClick={()=>onSeleccionar(articul)}>Editar</button>
                            <button className="bg-red-500 border rounded-2xl w-20 hover:cursor-pointer " onClick={()=>onEliminar(articul.IdArticulo)}>Eliminar</button>
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
