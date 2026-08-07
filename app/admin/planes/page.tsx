import { Copy, Dumbbell, Plus, Users } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";

const plans=[
  ["Transformación 12 semanas","4 días / semana","Fuerza + cardio + movilidad",7,"Camila Rojas, +6"],
  ["Hipertrofia personalizada","5 días / semana","Torso / pierna",4,"Matías Soto, +3"],
  ["Reinicio 8 semanas","3 días / semana","Full body progresivo",3,"Valentina Pérez, +2"],
  ["Performance","4 días / semana","Fuerza + potencia",4,"Tomás Arias, +3"]
];
export default function PlansPage(){return <AdminShell title="Planes de entrenamiento"><div className="toolbar right"><button className="btn primary"><Plus size={17}/>Crear plantilla</button></div><section className="plan-grid">{plans.map((p,i)=><article className="plan-card" key={p[0]}><div className="plan-top"><span className="plan-icon"><Dumbbell/></span><button className="icon-btn"><Copy size={17}/></button></div><span className="eyebrow">PLANTILLA {String(i+1).padStart(2,"0")}</span><h2>{p[0]}</h2><p>{p[2]}</p><div className="plan-data"><span><b>{p[1]}</b><small>Frecuencia</small></span><span><b>{p[3]}</b><small>Alumnos</small></span></div><div className="assigned"><Users size={15}/>{p[4]}</div><button className="btn light full">Abrir plantilla</button></article>)}</section></AdminShell>}
