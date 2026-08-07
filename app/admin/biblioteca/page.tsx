"use client";

import { useState } from "react";
import { Film, Plus, Search, UploadCloud } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/lib/data";

export default function LibraryPage(){
  const [category,setCategory]=useState("Todos");
  const [query,setQuery]=useState("");
  const filtered=videos.filter(v=>(category==="Todos"||v.category===category)&&v.title.toLowerCase().includes(query.toLowerCase()));
  return <AdminShell title="Biblioteca de videos"><section className="upload-banner"><div><span className="upload-icon"><UploadCloud/></span><div><span className="eyebrow">NUEVO MATERIAL</span><h2>Sube ejercicios, técnicas o sesiones completas</h2><p>El video puede quedar en tu biblioteca general o asignarse a alumnos específicos.</p></div></div><button className="btn dark"><Plus size={17}/>Subir video</button></section><div className="toolbar"><label className="search large"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar video..."/></label><div className="chips">{["Todos","Piernas","Torso","Espalda","Core","Movilidad"].map(c=><button onClick={()=>setCategory(c)} className={category===c?"chip selected":"chip"} key={c}>{c}</button>)}</div></div><section className="video-grid">{filtered.map(v=><VideoCard key={v.id} video={v}/>)}</section><div className="info-strip"><Film size={19}/><p><b>Recomendación para producción:</b> para el sistema final conviene almacenar los videos en Supabase Storage o un servicio de video especializado y guardar en la base solo la URL y metadatos.</p></div></AdminShell>;
}
