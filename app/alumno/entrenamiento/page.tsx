"use client";
import { useState } from "react";
import { Check, ChevronDown, Circle, Clock3, Play } from "lucide-react";
import { StudentNav } from "@/components/StudentNav";
const exercises=[
  ["Press de pecho con mancuernas","4 × 10","12 kg","90 s"],
  ["Remo unilateral","4 × 12","14 kg","75 s"],
  ["Press militar sentado","3 × 10","8 kg","75 s"],
  ["Jalón con banda","3 × 15","Banda media","60 s"],
  ["Elevaciones laterales","3 × 12","5 kg","60 s"],
  ["Plancha frontal","3 × 40 s","Peso corporal","45 s"]
];
export default function WorkoutPage(){const [done,setDone]=useState<number[]>([0]); return <div className="student-shell"><StudentNav/><main className="student-main narrow"><section className="workout-title"><span className="pill">SEMANA 5 · SESIÓN 2</span><h1>Torso · Fuerza</h1><p>Completa los ejercicios en orden y registra cómo te sentiste.</p></section><div className="exercise-list">{exercises.map((e,i)=>{const checked=done.includes(i); return <article className={checked?"exercise done-exercise":"exercise"} key={e[0]}><button className="check-ex" onClick={()=>setDone(checked?done.filter(x=>x!==i):[...done,i])}>{checked?<Check/>:<Circle/>}</button><div className="ex-main"><span className="ex-count">{String(i+1).padStart(2,"0")}</span><div><h2>{e[0]}</h2><p>{e[1]} · {e[2]} · descanso {e[3]}</p></div></div><button className="video-btn"><Play size={16} fill="currentColor"/>Ver técnica</button><button className="icon-btn"><ChevronDown size={18}/></button></article>})}</div><section className="finish-card"><Clock3/><div><span>{done.length} de {exercises.length} ejercicios</span><div className="progress-track"><i style={{width:`${done.length/exercises.length*100}%`}}/></div></div><button className="btn primary" disabled={done.length<exercises.length}>Finalizar sesión</button></section></main></div>}
