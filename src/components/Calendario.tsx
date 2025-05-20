import{ useState } from 'react';
import Fullcalendar from './Fullcalendar';
import EventForm from './EventForm';
import { EventInput } from '@fullcalendar/core/index.js';


export default function Calendario() {
    const [fecha, setFecha] = useState<string | null>(null);
    const[refresh, setRefresh] = useState(0)
    const [eventoSeleccionado, setEventoSeleccionado] = useState<EventInput | null>(null);
    const cerrar =() => {
       setRefresh(prev => prev + 1);
        setFecha(null); 
        setEventoSeleccionado(null) 
    }

  return (
    <div className='h-screen'>
        <h1 className='text-2xl font-bold text-center'>Calendario</h1>
        <div className=' ml-60 h-auto justify-center'>
            <Fullcalendar onDateClick={(dateStr) => setFecha(dateStr)} 
            onEventClick={(evento)=>{ setEventoSeleccionado(evento); setFecha(null)}} refresh={refresh} />        
        </div>
        {fecha && (
        <div  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    style={{ zIndex: 1000 }}>
          <EventForm fecha={fecha} onClose={()=>cerrar()} onSaved={cerrar} />
        </div>
      )}

      {eventoSeleccionado && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <EventForm
      fecha={eventoSeleccionado.start as string}
      evento={eventoSeleccionado}
      onClose={cerrar}
      onSaved={cerrar}
    />
  </div>
)}
        <br />
        <div className='flex w-full justify-center mt-4'>
            <h2 className='text-xl font-bold'>Fecha seleccionada: {fecha}</h2>
        </div>
    </div>
  )
}
