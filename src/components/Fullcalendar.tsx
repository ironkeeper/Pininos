import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import intercionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { EventInput } from '@fullcalendar/core';
import {  useState,useEffect } from 'react';


type Props ={
    onDateClick: (dateStr: string) => void;
    onEventClick: (event: EventInput) => void;
    refresh: number;
}




export default function Fullcalendar({ onEventClick, onDateClick,refresh}: Props) {
    const [events, setEvents] = useState<EventInput[]>([]);

useEffect(() => {
  handleEventos();
}, [refresh]);




const handleEventos = () => {
   axios.get("http://127.0.0.1:8000/eventos")
    .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
            const eventos : EventInput[] = res.data.map((evento: any) => ({
                id: evento.IdEvento,
                start: new Date(evento.Fecha).toISOString().split("T")[0],
                title: evento.Evento,
                color: evento.color
               
            }));
            
            setEvents(eventos);
            console.log(eventos)
        }
    })
    .catch((error) => {
        console.error(error);
    });
    console.log("inicio")
}


  return (
    <div>
        <FullCalendar
            plugins={[dayGridPlugin, intercionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}
            events={events}
            dateClick={(arg) => {
            onDateClick(arg.dateStr); 
            }}
            eventClick={(arg) => {
  onEventClick({
    id: String(arg.event.id),
    title: arg.event.title,
    start: arg.event.startStr,
    color: arg.event.backgroundColor,
  });
}}
        />
    </div>
  )
}
