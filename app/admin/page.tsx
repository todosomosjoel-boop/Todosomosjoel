import Link from "next/link";
import { Activity, ArrowUpRight, CalendarDays, CheckCircle2, Dumbbell, Users } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { ProgressBar } from "@/components/ProgressBar";
import { StatCard } from "@/components/StatCard";
import { clients, weeklyPlan } from "@/lib/data";

export default function AdminDashboard() {
  return <AdminShell title="Resumen"><section className="welcome-strip"><div><span>VIERNES · 07 AGOSTO</span><h2>Buen día, Joel 👋</h2><p>Tienes 3 revisiones pendientes y 2 alumnos con baja adherencia esta semana.</p></div><Link href="/admin/clientes" className="btn dark">Ver clientes <ArrowUpRight size={17}/></Link></section>
    <section className="stats-grid"><StatCard label="Clientes activos" value="18" helper="+2 este mes" icon={<Users size={19}/>}/><StatCard label="Adherencia promedio" value="84%" helper="+6% vs. mes anterior" icon={<Activity size={19}/>}/><StatCard label="Sesiones esta semana" value="47" helper="36 completadas" icon={<Dumbbell size={19}/>}/><StatCard label="Controles pendientes" value="3" helper="Próximos 7 días" icon={<CalendarDays size={19}/>}/></section>
    <section className="dashboard-grid"><div className="panel wide"><div className="panel-head"><div><span className="eyebrow">CLIENTES</span><h2>Seguimiento de alumnos</h2></div><Link href="/admin/clientes">Ver todos</Link></div><div className="client-table"><div className="table-row table-head"><span>Alumno</span><span>Plan</span><span>Adherencia</span><span>Próximo control</span><span>Estado</span></div>{clients.map(c=><Link href={`/admin/clientes/${c.id}`} className="table-row" key={c.id}><span className="person"><i className="avatar soft">{c.initials}</i><b>{c.name}<small>{c.goal}</small></b></span><span>{c.plan}</span><span className="adherence"><b>{c.adherence}%</b><ProgressBar value={c.adherence}/></span><span>{c.nextCheck}</span><span><i className={c.status === "Activo" ? "status active" : "status pause"}>{c.status}</i></span></Link>)}</div></div>
      <div className="panel"><div className="panel-head"><div><span className="eyebrow">HOY</span><h2>Agenda</h2></div></div><div className="agenda">{["09:00 · Control Camila R.","12:30 · Revisión Matías S.","18:00 · Sesión presencial Vale P."].map((x,i)=><div key={x}><span>{i===0?"09:00":i===1?"12:30":"18:00"}</span><p><b>{x.split(" · ")[1]}</b><small>{i===2?"Presencial":"Videollamada · 30 min"}</small></p><CheckCircle2 size={18}/></div>)}</div><button className="btn light full">Abrir agenda completa</button></div>
      <div className="panel" id="seguimiento"><div className="panel-head"><div><span className="eyebrow">ESTA SEMANA</span><h2>Plan modelo</h2></div></div><div className="week-list">{weeklyPlan.map(w=><div key={w.day}><span className={w.status==="Completado"?"day done":w.status==="Hoy"?"day today":"day"}>{w.day.slice(0,2)}</span><p><b>{w.label}</b><small>{w.exercises} ejercicios · {w.duration}</small></p><i>{w.status}</i></div>)}</div></div>
      <div className="panel lime-panel" id="objetivos"><span className="eyebrow">ALERTA INTELIGENTE</span><h2>2 alumnos requieren ajuste</h2><p>Su adherencia cayó más de 20% respecto de su promedio de las últimas 4 semanas.</p><button className="btn dark full">Revisar alumnos</button></div>
    </section>
  </AdminShell>;
}
