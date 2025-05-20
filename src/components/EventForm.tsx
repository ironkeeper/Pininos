import { useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { RootState } from "../store";
import { toast } from 'react-toastify';
import { EventInput } from '@fullcalendar/core/index.js';


type Event = {
    id?: number;
    start: string;
    title: string;
    color: string;
    userId: number | undefined;
}

type Prop ={
    evento?: EventInput;
    fecha: string;
    onClose: () => void;
    onSaved: () => void;
}



export default function EventForm({ onSaved,fecha,evento : eventoProp, onClose}: Prop) {
   const user = useSelector((state: RootState) => state.auth.user);
   
    const [evento, setEvento] = useState<Event>(
        {   
            id: undefined,
            start: fecha,
            title: "",
            color: "blue",
            userId: user?.id,
        }
    );

      useEffect(() => {
    if (eventoProp) {
      setEvento({
        id: Number(eventoProp.id),
        start: typeof eventoProp.start === 'string' ? eventoProp.start : new Date(eventoProp.start).toISOString(),
        title: eventoProp.title || "",
        color: eventoProp.color || "blue",
        userId: user?.id,
      });
    }
  }, [eventoProp, fecha, user]);
    

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     const api = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });
       if(evento?.id)
       {
      api.put(`/eventos/${evento.id}`,evento).then((res)=>{
        if(res.status === 200){
          toast.success("Evento actualizado")
          onClose()
          onSaved()
        }
      })
      



       }else{
  
    api.post("/eventos", evento)
    .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success("Evento creado");
            
            onClose();
        }
    })
  }
}




  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[400px] bg-white rounded-lg shadow-lg p-4 z-50"
  style={{ zIndex: 1001 }}>
         <h2 className="text-lg mb-2">Agregar Actividad para {fecha}</h2>
         <input type='hidden' value={evento.id} name='idEvento' />
      <input
        type="text"
        placeholder="Título"
        value={evento.title}
        onChange={(e) => setEvento({ ...evento, title: e.target.value })}
        className="border p-2 mb-2 w-full"
        required
      />
      <div className="flex justify-end gap-2">
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={()=>onClose()}  className="bg-gray-400 text-white px-4 py-2 rounded ">Cancelar</button>
      </div>
    </form>
  )
}
