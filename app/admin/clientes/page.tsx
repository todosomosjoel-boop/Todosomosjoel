"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Filter, Plus, Search, UserPlus } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { ProgressBar } from "@/components/ProgressBar";
import { clients as seedClients } from "@/lib/data";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [extra, setExtra] = useState<any[]>([]);
  const all = [...extra, ...seedClients];
  const filtered = useMemo(()=>all.filter(c=>`${c.name} ${c.goal} ${c.plan}`.toLowerCase().includes(search.toLowerCase())),[search, all.length]);
  function addClient(formData: FormData){
    const name = String(formData.get("name") || "Nuevo alumno");
    setExtra([{ id:"nuevo-alumno", name, initials:name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase(), email:String(formData.get("email")||""), phone:String(formData.get("phone")||""), goal:String(formData.get("goal")||"Por definir"), plan:"Evaluación inicial", status:"Activo", adherence:0, weight:0, startWeight:0, sessions:0, nextCheck:"Por agendar" }, ...extra]);
    setShowModal(false);
  }
  return <AdminShell title="Clientes"><div className="toolbar"><label className="search large"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por nombre, objetivo o plan..."/></label><button className="btn light"><Filter size={17}/>Filtros</button><button className="btn primary" onClick={()=>setShowModal(true)}><Plus size={17}/>Nuevo cliente</button></div>
    <section className="panel"><div className="panel-head"><div><span className="eyebrow">BASE DE ALUMNOS</span><h2>{filtered.length} clientes visibles</h2></div><span className="small-muted">Demo navegable</span></div><div className="client-table full-table"><div className="table-row table-head"><span>Alumno</span><span>Objetivo</span><span>Plan</span><span>Adherencia</span><span>Estado</span></div>{filtered.map(c=><Link key={`${c.id}-${c.name}`} href={`/admin/clientes/${c.id}`} className="table-row"><span className="person"><i className="avatar soft">{c.initials}</i><b>{c.name}<small>{c.email}</small></b></span><span>{c.goal}</span><span>{c.plan}</span><span className="adherence"><b>{c.adherence}%</b><ProgressBar value={c.adherence}/></span><span><i className={c.status==="Activo"?"status active":"status pause"}>{c.status}</i></span></Link>)}</div></section>
    {showModal && <div className="modal-backdrop" onMouseDown={()=>setShowModal(false)}><form action={addClient} className="modal" onMouseDown={e=>e.stopPropagation()}><div className="modal-icon"><UserPlus/></div><h2>Registrar nuevo cliente</h2><p>La ficha se puede completar después desde el perfil del alumno.</p><label>Nombre completo<input name="name" required placeholder="Ej. Daniela Soto"/></label><div className="form-grid"><label>Correo<input name="email" type="email" placeholder="correo@ejemplo.cl"/></label><label>Teléfono<input name="phone" placeholder="+56 9..."/></label></div><label>Objetivo principal<textarea name="goal" placeholder="Ej. Bajar grasa, ganar fuerza..."/></label><div className="modal-actions"><button type="button" className="btn light" onClick={()=>setShowModal(false)}>Cancelar</button><button className="btn primary">Crear cliente</button></div></form></div>}
  </AdminShell>;
}
