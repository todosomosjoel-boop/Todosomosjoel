import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronRight, Dumbbell, Edit3, Film, Mail, Phone, Ruler, Scale, Target } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { ProgressBar } from "@/components/ProgressBar";
import { VideoCard } from "@/components/VideoCard";
import { clients, videos, weeklyPlan } from "@/lib/data";

export default async function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = clients.find(x=>x.id===id) || clients[0];
  return <AdminShell title={c.name} eyebrow="Ficha del alumno"><Link href="/admin/clientes" className="back-link"><ArrowLeft size={16}/>Volver a clientes</Link>
    <section className="profile-hero"><div className="profile-user"><div className="avatar xlarge lime">{c.initials}</div><div><span className="status active">{c.status}</span><h2>{c.name}</h2><p>{c.goal}</p><div className="contact-row"><span><Mail size={15}/>{c.email}</span><span><Phone size={15}/>{c.phone}</span></div></div></div><button className="btn light"><Edit3 size={16}/>Editar ficha</button></section>
    <section className="metric-grid"><div><span><Scale/>Peso actual</span><strong>{c.weight} kg</strong><small>{(c.weight-c.startWeight).toFixed(1)} kg desde inicio</small></div><div><span><Target/>Adherencia</span><strong>{c.adherence}%</strong><ProgressBar value={c.adherence}/></div><div><span><Dumbbell/>Sesiones</span><strong>{c.sessions}</strong><small>completadas</small></div><div><span><CalendarDays/>Próximo control</span><strong>{c.nextCheck}</strong><small>30 minutos</small></div></section>
    <section className="dashboard-grid detail-grid"><div className="panel wide"><div className="panel-head"><div><span className="eyebrow">PLAN ACTUAL</span><h2>{c.plan}</h2></div><button className="btn light small">Editar plan</button></div><div className="week-list detailed">{weeklyPlan.map((w,i)=><div key={w.day}><span className={i===0?"day done":i===1?"day today":"day"}>{w.day.slice(0,2)}</span><p><b>{w.day} · {w.label}</b><small>{w.exercises} ejercicios · {w.duration}</small></p><i>{w.status}</i><ChevronRight size={17}/></div>)}</div></div>
      <div className="panel"><div className="panel-head"><div><span className="eyebrow">EVALUACIÓN</span><h2>Datos iniciales</h2></div></div><dl className="data-list"><div><dt>Estatura</dt><dd>1,68 m</dd></div><div><dt>Peso inicial</dt><dd>{c.startWeight} kg</dd></div><div><dt>Cintura</dt><dd>78 cm</dd></div><div><dt>Experiencia</dt><dd>Intermedia</dd></div><div><dt>Disponibilidad</dt><dd>4 días/sem.</dd></div></dl><button className="btn light full"><Ruler size={16}/>Registrar medición</button></div>
      <div className="panel wide"><div className="panel-head"><div><span className="eyebrow">VIDEOS ASIGNADOS</span><h2>Material para {c.name.split(" ")[0]}</h2></div><Link href="/admin/biblioteca">Asignar video</Link></div><div className="video-grid two">{videos.slice(0,2).map(v=><VideoCard key={v.id} video={v} compact/>)}</div></div>
      <div className="panel notes-panel"><div className="panel-head"><div><span className="eyebrow">NOTAS</span><h2>Feedback del entrenador</h2></div></div><div className="note-item"><span>07 ago</span><p>Buena técnica en sentadilla. La próxima semana podemos subir 2 kg si mantiene rango completo.</p></div><div className="note-item"><span>31 jul</span><p>Reporta mejor recuperación. Mantener volumen y priorizar sueño.</p></div><button className="btn dark full"><Film size={16}/>Agregar nota</button></div>
    </section>
  </AdminShell>;
}
