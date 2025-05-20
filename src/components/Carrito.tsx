import { useState, useEffect } from "react"
import axios from "axios"

type unProducto = {
    IdArticulo : number;
    Articulo: string;
}

type Producto = {
  unArticulo: unProducto;
  Cantidad: number;
  IdUser: number;
}

export default function Carrito({user} : {user: number}) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cantidad, setCantidad] = useState<number>(0);
    const [producto, setProducto] = useState<unProducto>({
        IdArticulo: 0,
        Articulo: "",
    });
  const [todosLosProductos, setTodosLosProductos] = useState<unProducto[]>([]);
  const [sugerencias, setSugerencias] = useState<unProducto[]>([]);


    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });
//mandamos traer todos los productos para que se carguen cuando se carga la pagina
    const fetchProductos = () => {
        api.get("/articulis").then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                setTodosLosProductos(res.data);
            }
        })
        .catch((error) => { 
            console.error(error);
        });
    }

useEffect(() => {
    fetchProductos();
}
, []);

//filtrar sugerencias al escribir en el input
 const handleBuscar = (texto: string) => {
    setProducto({ IdArticulo: 0, Articulo: texto });
    const coincidencias = todosLosProductos.filter(p =>
      p.Articulo.toLowerCase().includes(texto.toLowerCase())
    );
    setSugerencias(coincidencias);
  };

//cuando seleccionamos un producto de la lista de sugerencias
 // Seleccionar producto de la lista
  const seleccionarProducto = (item: unProducto) => {
    setProducto(item);
    setSugerencias([]);
  };

  // Agregar al carrito
  const agregarAlCarrito = () => {
    if (!producto.IdArticulo || !cantidad) return;

    const nuevoProducto: Producto = {
      unArticulo: producto,
      Cantidad: cantidad,
      IdUser: user,
    };

    //setProductos([...productos, nuevoProducto]);
    setProductos((prevProductos) => {
  // Buscar si ya existe un producto con el mismo ID y usuario
  const existe = prevProductos.find(
    (p) =>
      p.unArticulo.IdArticulo === nuevoProducto.unArticulo.IdArticulo &&
      p.IdUser === nuevoProducto.IdUser
  );

  if (existe) {
    // Si ya existe, crear una nueva lista con la cantidad actualizada
    return prevProductos.map((p) =>
      p.unArticulo.IdArticulo === nuevoProducto.unArticulo.IdArticulo &&
      p.IdUser === nuevoProducto.IdUser
        ? { ...p, Cantidad: p.Cantidad + nuevoProducto.Cantidad }
        : p
    );
  } else {
    // Si no existe, simplemente agregarlo
    return [...prevProductos, nuevoProducto];
  }
});
    // Reiniciar
    setProducto({ IdArticulo: 0, Articulo: "" });
    setCantidad(1);
  };

  return (
    <div>
        <br />
        <input type="text" className="border border-gray-300 rounded-lg p-2 w-2xl"
        placeholder="Buscar producto" 
        onChange={(e) => handleBuscar(e.target.value)}
        value={producto.Articulo}
        />
         {sugerencias.length > 0 && (
        <ul className="border border-gray-300 rounded bg-white shadow mt-1">
          {sugerencias.map((item) => (
            <li
              key={item.IdArticulo}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => seleccionarProducto(item)}
            >
              {item.Articulo}
            </li>
          ))}
        </ul>
      )}
        <br />
        <label htmlFor="">Cantidad</label>
        <input type="number" className="border border-gray-300 rounded-lg p-2 w-2xl"
        onChange={(e) => setCantidad(Number(e.target.value))}
        value={cantidad}
        placeholder="Cantidad" />
        <br />
        <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={agregarAlCarrito}>Agregar al carrito</button>

      { productos.length === 0 ? (
        <p className="text-red-500">No hay productos en el carrito</p>) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Nombre</th>
                    <th className="border border-gray-200 px-4 py-2">Cantidad</th>
                    <th className="border border-gray-200 px-4 py-2">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                    <tr key={producto.unArticulo.IdArticulo} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{producto.unArticulo.Articulo}</td>
                        <td className="border border-gray-200 px-4 py-2">{producto.Cantidad}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            <button className="bg-red-500 text-white p-2 rounded-lg" onClick={()=>setProductos(productos.filter(p => p !== producto))}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>

</table>
        )}
        <button className="bg-green-500 text-white p-2 rounded-lg" onClick={fetchProductos}>Actualizar Carrito</button>
        <br />
        <br />
        <button className="bg-blue-500 text-white p-2 rounded-lg">Proceder al pago</button>


    </div>
  )
}
